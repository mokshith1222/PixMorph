'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageSharper() {
  const [file, setFile] = useState<File | null>(null)
  const [sharpness, setSharpness] = useState(1)
  const [sharpening, setSharpening] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleSharpen = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }
    setSharpening(true)
    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise((resolve) => { img.onload = resolve })
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const tempData = new Uint8ClampedArray(data)
      const w = canvas.width
      const h = canvas.height
      const kernel = [-1, -1, -1, -1, 9 + sharpness, -1, -1, -1, -1]

      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          let r = 0, g = 0, b = 0
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const idx = ((y + ky) * w + (x + kx)) * 4
              const k = kernel[(ky + 1) * 3 + (kx + 1)]
              r += tempData[idx] * k
              g += tempData[idx + 1] * k
              b += tempData[idx + 2] * k
            }
          }
          const idx = (y * w + x) * 4
          data[idx] = Math.min(255, Math.max(0, r))
          data[idx + 1] = Math.min(255, Math.max(0, g))
          data[idx + 2] = Math.min(255, Math.max(0, b))
        }
      }
      ctx.putImageData(imageData, 0, 0)
      setResultUrl(canvas.toDataURL('image/png'))
      URL.revokeObjectURL(url)
      toast.success('Image sharpened successfully!')
    } catch {
      toast.error('Failed to sharpen image')
    } finally {
      setSharpening(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => f[0] && (setFile(f[0]), setResultUrl(null))} accept="image/*" multiple={false} />
      {file && <div className="text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{file.name}</div>}
      <div>
        <label className="text-sm font-medium mb-1 block">Sharpness Level (0-5)</label>
        <Input type="number" value={sharpness} onChange={(e) => setSharpness(Number(e.target.value))} min={0} max={5} step={0.1} />
      </div>
      <Button onClick={handleSharpen} disabled={!file || sharpening} className="w-full">
        {sharpening ? 'Sharpening...' : 'Sharpen Image'}
      </Button>
      {resultUrl && (
        <div className="space-y-3">
          <img src={resultUrl} alt="Sharpened" className="w-full rounded-lg border" />
          <Button variant="secondary" className="w-full" onClick={() => {
            const link = document.createElement('a')
            link.href = resultUrl
            link.download = 'sharpened-image.png'
            link.click()
          }}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  )
}
