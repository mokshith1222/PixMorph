'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageRotator() {
  const [file, setFile] = useState<File | null>(null)
  const [angle, setAngle] = useState(90)
  const [rotating, setRotating] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleRotate = async () => {
    if (!file) {
      toast.error('Please select an image first')
      return
    }
    setRotating(true)
    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise((resolve) => { img.onload = resolve })
      const rad = (angle * Math.PI) / 180
      const sin = Math.abs(Math.sin(rad))
      const cos = Math.abs(Math.cos(rad))
      const canvas = document.createElement('canvas')
      canvas.width = img.width * cos + img.height * sin
      canvas.height = img.width * sin + img.height * cos
      const ctx = canvas.getContext('2d')!
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(rad)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)
      setResultUrl(canvas.toDataURL('image/png'))
      URL.revokeObjectURL(url)
      toast.success(`Image rotated ${angle}°!`)
    } catch {
      toast.error('Failed to rotate image')
    } finally {
      setRotating(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => f[0] && (setFile(f[0]), setResultUrl(null))} accept="image/*" multiple={false} />
      {file && <div className="text-sm p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">{file.name}</div>}
      <div className="flex gap-2">
        {[90, 180, 270].map((a) => (
          <Button key={a} onClick={() => setAngle(a)} variant={angle === a ? 'primary' : 'secondary'}>{a}°</Button>
        ))}
      </div>
      <Button onClick={handleRotate} disabled={!file || rotating} className="w-full">
        {rotating ? 'Rotating...' : 'Rotate Image'}
      </Button>
      {resultUrl && (
        <div className="space-y-3">
          <img src={resultUrl} alt="Rotated" className="w-full rounded-lg border" />
          <Button variant="secondary" className="w-full" onClick={() => {
            const link = document.createElement('a')
            link.href = resultUrl
            link.download = `rotated-${angle}deg.png`
            link.click()
          }}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>
      )}
    </div>
  )
}
