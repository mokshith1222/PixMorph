'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import JSZip from 'jszip'
import toast from 'react-hot-toast'
import { audioBufferToMp3 } from '@/lib/pdf-utils'

type ConvertedFile = { name: string; url: string; size: number }



export function VolumeBooster() {
  const [files, setFiles] = useState<File[]>([])
  const [boostLevel, setBoostLevel] = useState<number>(2)
  const [boosting, setBoosting] = useState(false)
  const [boostedFiles, setBoostedFiles] = useState<ConvertedFile[]>([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const audioFiles = newFiles.filter((f) => f.type.startsWith('audio/'))
    if (audioFiles.length === 0) {
      toast.error('Please select audio files only')
      return
    }
    setFiles((prev) => [...prev, ...audioFiles])
  }

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setFiles([])
    setBoostedFiles([])
    setProgress(0)
  }

  const handleBoost = async () => {
    if (files.length === 0) return

    setBoosting(true)
    setProgress(0)
    setBoostedFiles([])

    try {
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await files[i].arrayBuffer()
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioCtx()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        const boostedBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);
        for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
            const channelData = audioBuffer.getChannelData(ch);
            const boostedChannel = new Float32Array(audioBuffer.length);
            for (let j = 0; j < audioBuffer.length; j++) {
                boostedChannel[j] = Math.max(-1, Math.min(1, channelData[j] * boostLevel));
            }
            boostedBuffer.getChannelData(ch).set(boostedChannel);
        }
        const boostedData = audioBufferToMp3(boostedBuffer, 128);
        const blob = new Blob([boostedData], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        const name = files[i].name.replace(/\.[^.]+$/, '-boosted.mp3')

        results.push({ name, url, size: blob.size })
        setProgress(((i + 1) / files.length) * 100)
        await audioContext.close()
      }

      setBoostedFiles(results)
      toast.success(`Successfully boosted ${results.length} file(s)!`)
    } catch (error) {
      console.error('Volume boost error:', error)
      toast.error('Failed to boost volume. Please try again.')
    } finally {
      setBoosting(false)
    }
  }

  const handleDownloadAll = async () => {
    if (boostedFiles.length === 0) return

    const zip = new JSZip()
    for (const file of boostedFiles) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      zip.file(file.name, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'boosted-audio.zip'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {files.length} file{files.length !== 1 ? 's' : ''} selected
        </span>
        {files.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-red-500 hover:text-red-600">
            Clear All
          </Button>
        )}
      </div>

      <DropZone onFilesDrop={handleFiles} accept="audio/*" multiple />

      {files.length > 0 && (
        <FileList files={files} onRemove={handleRemove} converting={boosting} />
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Boost Level (1-10)</label>
        <Input
          type="number"
          value={boostLevel}
          onChange={(e) => setBoostLevel(Number(e.target.value))}
          min={1}
          max={10}
        />
      </div>

      {boosting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Boosting...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {boostedFiles.length > 0 && !boosting && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-600 dark:text-green-400">
                {boostedFiles.length} file(s) boosted!
              </span>
              <Button onClick={handleDownloadAll} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleBoost} disabled={files.length === 0 || boosting} className="w-full">
        {boosting ? 'Boosting...' : 'Boost Volume'}
      </Button>
    </div>
  )
}
