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



export function AudioTrimmer() {
  const [files, setFiles] = useState<File[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [endTime, setEndTime] = useState<number>(30)
  const [trimming, setTrimming] = useState(false)
  const [trimmedFiles, setTrimmedFiles] = useState<ConvertedFile[]>([])
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
    setTrimmedFiles([])
    setProgress(0)
  }

  const handleTrim = async () => {
    if (files.length === 0) return

    if (endTime <= startTime) {
      toast.error('End time must be greater than start time')
      return
    }

    setTrimming(true)
    setProgress(0)
    setTrimmedFiles([])

    try {
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await files[i].arrayBuffer()
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioCtx()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        const startOffset = Math.floor(startTime * audioBuffer.sampleRate);
        const endOffset = Math.floor(endTime * audioBuffer.sampleRate);
        const actualEnd = Math.min(endOffset, audioBuffer.length);
        const newLength = actualEnd - startOffset;
        
        let trimmedData: ArrayBuffer;
        if (newLength > 0 && startOffset < audioBuffer.length) {
            const trimmedBuffer = audioContext.createBuffer(audioBuffer.numberOfChannels, newLength, audioBuffer.sampleRate);
            for (let ch = 0; ch < audioBuffer.numberOfChannels; ch++) {
                const channelData = audioBuffer.getChannelData(ch);
                const trimmedChannel = new Float32Array(newLength);
                for (let j = 0; j < newLength; j++) {
                    trimmedChannel[j] = channelData[startOffset + j];
                }
                trimmedBuffer.getChannelData(ch).set(trimmedChannel);
            }
            trimmedData = audioBufferToMp3(trimmedBuffer, 128);
        } else {
            trimmedData = audioBufferToMp3(audioBuffer, 128);
        }
        const blob = new Blob([trimmedData as any], { type: 'audio/mpeg' })
        const url = URL.createObjectURL(blob)
        const name = files[i].name.replace(/\.[^.]+$/, '-trimmed.mp3')

        results.push({ name, url, size: blob.size })
        setProgress(((i + 1) / files.length) * 100)
        await audioContext.close()
      }

      setTrimmedFiles(results)
      toast.success(`Successfully trimmed ${results.length} file(s)!`)
    } catch (error) {
      console.error('Audio trim error:', error)
      toast.error('Failed to trim audio. Please try again.')
    } finally {
      setTrimming(false)
    }
  }

  const handleDownloadAll = async () => {
    if (trimmedFiles.length === 0) return

    const zip = new JSZip()
    for (const file of trimmedFiles) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      zip.file(file.name, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'trimmed-audio.zip'
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
        <FileList files={files} onRemove={handleRemove} converting={trimming} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Start Time (seconds)</label>
          <Input
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value))}
            min={0}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">End Time (seconds)</label>
          <Input
            type="number"
            value={endTime}
            onChange={(e) => setEndTime(Number(e.target.value))}
            min={1}
          />
        </div>
      </div>

      {trimming && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Trimming...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {trimmedFiles.length > 0 && !trimming && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-600 dark:text-green-400">
                {trimmedFiles.length} file(s) trimmed!
              </span>
              <Button onClick={handleDownloadAll} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleTrim} disabled={files.length === 0 || trimming} className="w-full">
        {trimming ? 'Trimming...' : 'Trim Audio'}
      </Button>
    </div>
  )
}
