'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageCropper() {
  const [file, setFile] = useState<File | null>(null)
  const [cropX, setCropX] = useState(0)
  const [cropY, setCropY] = useState(0)
  const [cropWidth, setCropWidth] = useState(300)
  const [cropHeight, setCropHeight] = useState(300)
  const [cropping, setCropping] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleCrop = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }
    setCropping(true)
    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise((resolve) => { img.onload = resolve })
      const canvas = document.createElement('canvas')
      canvas.width = cropWidth
      canvas.height = cropHeight
      canvas.getContext('2d')?.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
      setResultUrl(canvas.toDataURL('image/png'))
      URL.revokeObjectURL(url)
      toast.success('Image cropped successfully!')
    } catch {
      toast.error('Failed to crop image')
    } finally {
      setCropping(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => f[0] && (setFile(f[0]), setResultUrl(null))} accept="image/*" multiple={false} />
      {file && <div className="text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{file.name}</div>}
      <div className="grid grid-cols-2 gap-4">
        {[
          ['X Position', cropX, setCropX],
          ['Y Position', cropY, setCropY],
          ['Width', cropWidth, setCropWidth],
          ['Height', cropHeight, setCropHeight],
        ].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="text-sm font-medium mb-1 block">{label as string}</label>
            <Input type="number" value={val as number} onChange={(e) => (setter as (n: number) => void)(Number(e.target.value))} min={0} />
          </div>
        ))}
      </div>
      <Button onClick={handleCrop} disabled={!file || cropping} className="w-full">
        {cropping ? 'Cropping...' : 'Crop Image'}
      </Button>
      {resultUrl && (
        <div className="space-y-3">
          <img src={resultUrl} alt="Cropped" className="w-full rounded-lg border" />
          <Button variant="secondary" className="w-full" onClick={() => {
            const link = document.createElement('a')
            link.href = resultUrl
            link.download = 'cropped-image.png'
            link.click()
          }}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  )
}
