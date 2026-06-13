'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download, Trash2, FileOutput } from 'lucide-react'
import JSZip from 'jszip'
import toast from 'react-hot-toast'

interface HeicConverterProps {
  targetFormat: 'jpg' | 'png' | 'webp' | 'avif'
}

export function HeicConverter({ targetFormat }: HeicConverterProps) {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<
    { name: string; url: string; size: number }[]
  >([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const heicFiles = Array.from(newFiles).filter(
      (f) =>
        f.type === 'image/heic' ||
        f.type === 'image/heif' ||
        f.name.toLowerCase().endsWith('.heic') ||
        f.name.toLowerCase().endsWith('.heif')
    )
    if (heicFiles.length === 0) {
      toast.error('Please select HEIC files only')
      return
    }
    setFiles((prev) => [...prev, ...heicFiles])
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
      const results: { name: string; url: string; size: number }[] = []
      const toType =
        targetFormat === 'jpg'
          ? 'image/jpeg'
          : targetFormat === 'png'
            ? 'image/png'
            : targetFormat === 'webp'
              ? 'image/webp'
              : 'image/avif'

      const heic2any = (await import('heic2any')).default

      for (let i = 0; i < files.length; i++) {
        const result = await heic2any({
          blob: files[i],
          toType,
          quality: 0.9,
        })

        const blob = Array.isArray(result) ? result[0] : result
        const url = URL.createObjectURL(blob)
        const name = files[i].name.replace(/\.heic$/i, `.${targetFormat}`)
        results.push({ name, url, size: blob.size })
        setProgress(((i + 1) / files.length) * 100)
      }

      setConvertedFiles(results)
      toast.success(`Successfully converted ${results.length} file(s)!`)
    } catch (error) {
      console.error('Conversion error:', error)
      toast.error('Conversion failed. Please try again.')
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
    link.download = `converted-${targetFormat}.zip`
    link.click()
    URL.revokeObjectURL(url)
    toast.success('Download started!')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileOutput className="w-5 h-5 text-primary-500" />
          <span className="text-sm text-gray-500">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </span>
        </div>
        {files.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      <DropZone onFilesDrop={handleFiles} accept=".heic,.HEIC,.heif,.HEIF" multiple />

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
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {convertedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <span className="text-sm">{file.name}</span>
                <a
                  href={file.url}
                  download={file.name}
                  className="text-primary-500 hover:text-primary-600"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleConvert}
        disabled={files.length === 0 || converting}
        className="w-full"
      >
        {converting ? 'Converting...' : `Convert to ${targetFormat.toUpperCase()}`}
      </Button>
    </div>
  )
}
