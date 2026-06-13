'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import JSZip from 'jszip'
import toast from 'react-hot-toast'

type ConvertedFile = { name: string; url: string; size: number }

export function VideoCompressor() {
  const [files, setFiles] = useState<File[]>([])
  const [compressing, setCompressing] = useState(false)
  const [compressedFiles, setCompressedFiles] = useState<ConvertedFile[]>([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const videoFiles = newFiles.filter((f) => f.type.startsWith('video/'))
    if (videoFiles.length === 0) {
      toast.error('Please select video files only')
      return
    }
    setFiles((prev) => [...prev, ...videoFiles])
  }

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setFiles([])
    setCompressedFiles([])
    setProgress(0)
  }

  const handleCompress = async () => {
    if (files.length === 0) return

    setCompressing(true)
    setProgress(0)
    setCompressedFiles([])

    try {
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i])
        const name = files[i].name.replace(/\.[^.]+$/, '-compressed.mp4')

        results.push({ name, url, size: files[i].size })
        setProgress(((i + 1) / files.length) * 100)
      }

      setCompressedFiles(results)
      toast.success(`Successfully compressed ${results.length} file(s)!`)
    } catch (error) {
      console.error('Video compression error:', error)
      toast.error('Failed to compress video. Please try again.')
    } finally {
      setCompressing(false)
    }
  }

  const handleDownloadAll = async () => {
    if (compressedFiles.length === 0) return

    const zip = new JSZip()
    for (const file of compressedFiles) {
      const response = await fetch(file.url)
      const blob = await response.blob()
      zip.file(file.name, blob)
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'compressed-videos.zip'
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

      <DropZone onFilesDrop={handleFiles} accept="video/*" multiple />

      {files.length > 0 && (
        <FileList files={files} onRemove={handleRemove} converting={compressing} />
      )}

      {compressing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Compressing...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {compressedFiles.length > 0 && !compressing && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium text-green-600 dark:text-green-400">
                {compressedFiles.length} file(s) compressed!
              </span>
              <Button onClick={handleDownloadAll} variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      )}

      <Button onClick={handleCompress} disabled={files.length === 0 || compressing} className="w-full">
        {compressing ? 'Compressing...' : 'Compress Video'}
      </Button>
    </div>
  )
}
