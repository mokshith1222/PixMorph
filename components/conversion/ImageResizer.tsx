'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [width, setWidth] = useState<number>(800)
  const [height, setHeight] = useState<number>(600)
  const [resizing, setResizing] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResultUrl(null)
    }
  }

  const handleResize = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }
    setResizing(true)
    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise((resolve) => { img.onload = resolve })
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d')?.drawImage(img, 0, 0, width, height)
      setResultUrl(canvas.toDataURL('image/png'))
      URL.revokeObjectURL(url)
      toast.success('Image resized successfully!')
    } catch {
      toast.error('Failed to resize image')
    } finally {
      setResizing(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} />
      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>Remove</Button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Width (px)</label>
          <Input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} min={1} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Height (px)</label>
          <Input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} min={1} />
        </div>
      </div>
      <Button onClick={handleResize} disabled={!file || resizing} className="w-full">
        {resizing ? 'Resizing...' : 'Resize Image'}
      </Button>
      {resultUrl && (
        <div className="space-y-3">
          <img src={resultUrl} alt="Resized" className="w-full rounded-lg border" />
          <Button variant="secondary" className="w-full" onClick={() => {
            const link = document.createElement('a')
            link.href = resultUrl
            link.download = `resized-${width}x${height}.png`
            link.click()
          }}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  )
}
