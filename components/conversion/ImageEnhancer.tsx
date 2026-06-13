'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageEnhancer() {
  const [file, setFile] = useState<File | null>(null)
  const [brightness, setBrightness] = useState(0)
  const [contrast, setContrast] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [enhancing, setEnhancing] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleEnhance = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }
    setEnhancing(true)
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
      const satFactor = saturation / 100

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, Math.max(0, data[i] + brightness))
        data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightness))
        data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightness))
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
        data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128))
        data[i + 1] = Math.min(255, Math.max(0, factor * (data[i + 1] - 128) + 128))
        data[i + 2] = Math.min(255, Math.max(0, factor * (data[i + 2] - 128) + 128))
        const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        data[i] = Math.min(255, Math.max(0, gray + satFactor * (data[i] - gray)))
        data[i + 1] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 1] - gray)))
        data[i + 2] = Math.min(255, Math.max(0, gray + satFactor * (data[i + 2] - gray)))
      }
      ctx.putImageData(imageData, 0, 0)
      setResultUrl(canvas.toDataURL('image/png'))
      URL.revokeObjectURL(url)
      toast.success('Image enhanced successfully!')
    } catch {
      toast.error('Failed to enhance image')
    } finally {
      setEnhancing(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => f[0] && (setFile(f[0]), setResultUrl(null))} accept="image/*" multiple={false} />
      {file && <div className="text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{file.name}</div>}
      {[
        ['Brightness (-100 to 100)', brightness, setBrightness],
        ['Contrast (-100 to 100)', contrast, setContrast],
        ['Saturation (-100 to 100)', saturation, setSaturation],
      ].map(([label, val, setter]) => (
        <div key={label as string}>
          <label className="text-sm font-medium mb-1 block">{label as string}</label>
          <Input type="number" value={val as number} onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))} min={-100} max={100} />
        </div>
      ))}
      <Button onClick={handleEnhance} disabled={!file || enhancing} className="w-full">
        {enhancing ? 'Enhancing...' : 'Enhance Image'}
      </Button>
      {resultUrl && (
        <div className="space-y-3">
          <img src={resultUrl} alt="Enhanced" className="w-full rounded-lg border" />
          <Button variant="secondary" className="w-full" onClick={() => {
            const link = document.createElement('a')
            link.href = resultUrl
            link.download = 'enhanced-image.png'
            link.click()
          }}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  )
}
