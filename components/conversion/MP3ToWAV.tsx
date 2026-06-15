'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import JSZip from 'jszip'
import { audioBufferToWav } from '@/lib/pdf-utils'
import toast from 'react-hot-toast'

type ConvertedFile = { name: string; url: string; size: number }

export function MP3ToWAV() {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const audioFiles = newFiles.filter(
      (f) => f.type === 'audio/mpeg' || f.name.toLowerCase().endsWith('.mp3')
    )
    if (audioFiles.length === 0) {
      toast.error('Please select MP3 files only')
      return
    }
    setFiles((prev) => [...prev, ...audioFiles])
  }

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setFiles([])
    setConvertedFiles([])
    setProgress(0)
  }

  const handleConvert = async () => {
    if (files.length === 0) return

    setConverting(true)
    setProgress(0)
    setConvertedFiles([])

    try {
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const arrayBuffer = await files[i].arrayBuffer()
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioCtx()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        const wavData = audioBufferToWav(audioBuffer)
        const blob = new Blob([wavData as any], { type: 'audio/wav' })
        const url = URL.createObjectURL(blob)
        const name = files[i].name.replace(/\.mp3$/i, '.wav')

        results.push({ name, url, size: blob.size })
        setProgress(((i + 1) / files.length) * 100)
        await audioContext.close()
      }

      setConvertedFiles(results)
      toast.success(`Successfully converted ${results.length} file(s)!`)
    } catch (error) {
      console.error('MP3 to WAV error:', error)
      toast.error('Failed to convert MP3 to WAV. Please try again.')
    } finally {
      setConverting(false)
    }
  }

  const handleDownloadAll = async () => {
    if (convertedFiles.length === 0) return

    const zip = new JSZip()
    for (const file of convertedFiles) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      zip.file(file.name, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'mp3-to-wav.zip'
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

      <DropZone onFilesDrop={handleFiles} accept=".mp3" multiple />

      {files.length > 0 && (
        <FileList files={files} onRemove={handleRemove} converting={converting} />
      )}

      {converting && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Converting...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {convertedFiles.length > 0 && !converting && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-600 dark:text-green-400">
                {convertedFiles.length} file(s) converted!
              </span>
              <Button onClick={handleDownloadAll} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleConvert} disabled={files.length === 0 || converting} className="w-full">
        {converting ? 'Converting...' : 'Convert to WAV'}
      </Button>
    </div>
  )
}
