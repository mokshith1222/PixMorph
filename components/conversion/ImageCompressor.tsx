'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download, Trash2 } from 'lucide-react'
import JSZip from 'jszip'
import toast from 'react-hot-toast'

export function ImageCompressor() {
  const [files, setFiles] = useState<File[]>([])
  const [quality, setQuality] = useState(0.8)
  const [compressing, setCompressing] = useState(false)
  const [compressedFiles, setCompressedFiles] = useState<
    { name: string; url: string; size: number }[]
  >([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const imageFiles = newFiles.filter((f) => f.type.startsWith('image/'))
    if (imageFiles.length === 0) {
      toast.error('Please select image files only')
      return
    }
    setFiles((prev) => [...prev, ...imageFiles])
  }

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClear = () => {
    setFiles([])
    setCompressedFiles([])
    setProgress(0)
  }

  const compressFile = async (file: File): Promise<{ blob: Blob; name: string }> => {
    const Compressor = (await import('compressorjs')).default
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality,
        success(result) {
          const blob = result instanceof Blob ? result : new Blob([result])
          resolve({
            blob,
            name: file.name.replace(/(\.[^.]+)$/, '-compressed$1'),
          })
        },
        error(err) {
          reject(err)
        },
      })
    })
  }

  const handleCompress = async () => {
    if (files.length === 0) return

    setCompressing(true)
    setProgress(0)
    setCompressedFiles([])

    try {
      const results: { name: string; url: string; size: number }[] = []

      for (let i = 0; i < files.length; i++) {
        const { blob, name } = await compressFile(files[i])
        results.push({
          name,
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }

      setCompressedFiles(results)
      toast.success(`Successfully compressed ${results.length} file(s)!`)
    } catch (error) {
      console.error('Compression error:', error)
      toast.error('Failed to compress images. Please try again.')
    } finally {
      setCompressing(false)
    }
  }

  const handleDownloadAll = async () => {
    if (compressedFiles.length === 0) return

    const zip = new JSZip()
    for (const file of compressedFiles) {
      const response = await fetch(file.url)
      zip.file(file.name, await response.blob())
    }

    const content = await zip.generateAsync({ type: 'blob' })
    const url = URL.createObjectURL(content)
    const link = document.createElement('a')
    link.href = url
    link.download = 'compressed-images.zip'
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={handleFiles} accept="image/*" multiple />

      {files.length > 0 && (
        <>
          <FileList files={files} onRemove={handleRemove} converting={compressing} />
          <Button variant="ghost" size="sm" onClick={handleClear} className="text-red-500">
            <Trash2 className="w-4 h-4 mr-1" /> Clear All
          </Button>
        </>
      )}

      <div>
        <label className="text-sm font-medium mb-1 block">
          Quality ({Math.round(quality * 100)}%)
        </label>
        <Input
          type="range"
          min="0.1"
          max="1"
          step="0.05"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
        />
      </div>

      {compressing && (
        <div className="space-y-2">
          <ProgressBar progress={progress} />
        </div>
      )}

      {compressedFiles.length > 0 && !compressing && (
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex justify-between items-center">
          <span className="font-medium text-green-600 dark:text-green-400">
            {compressedFiles.length} file(s) compressed!
          </span>
          <Button onClick={handleDownloadAll} variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
        </div>
      )}

      <Button
        onClick={handleCompress}
        disabled={files.length === 0 || compressing}
        className="w-full"
      >
        {compressing ? 'Compressing...' : 'Compress Images'}
      </Button>
    </div>
  )
}
