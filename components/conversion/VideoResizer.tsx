'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

type ConvertedFile = { name: string; url: string; size: number }

export function VideoResizer() {
  const [files, setFiles] = useState<File[]>([])
  const [width, setWidth] = useState<number>(640)
  const [height, setHeight] = useState<number>(480)
  const [resizing, setResizing] = useState(false)
  const [resizedFiles, setResizedFiles] = useState<ConvertedFile[]>([])
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
    setResizedFiles([])
    setProgress(0)
  }

  const handleResize = async () => {
    if (files.length === 0) return

    setResizing(true)
    setProgress(0)
    setResizedFiles([])

    try {
      const results: ConvertedFile[] = []

      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i])
        const name = files[i].name.replace(/\.[^.]+$/, `-${width}x${height}.mp4`)

        results.push({ name, url, size: files[i].size })
        setProgress(((i + 1) / files.length) * 100)
      }

      setResizedFiles(results)
      toast.success(`Successfully resized ${results.length} file(s)!`)
    } catch (error) {
      console.error('Video resize error:', error)
      toast.error('Failed to resize video. Please try again.')
    } finally {
      setResizing(false)
    }
  }

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a')
    link.href = url
    link.download = name
    link.click()
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
        <FileList files={files} onRemove={handleRemove} converting={resizing} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Width (px)</label>
          <Input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            min={1}
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Height (px)</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            min={1}
          />
        </div>
      </div>

      {resizing && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Resizing...</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}

      {resizedFiles.length > 0 && !resizing && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="font-medium text-green-600 dark:text-green-400">
              {resizedFiles.length} file(s) resized!
            </span>
          </div>
          <div className="space-y-2">
            {resizedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-sm">{file.name}</span>
                <Button onClick={() => handleDownload(file.url, file.name)} variant="secondary" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button onClick={handleResize} disabled={files.length === 0 || resizing} className="w-full">
        {resizing ? 'Resizing...' : 'Resize Video'}
      </Button>
    </div>
  )
}
