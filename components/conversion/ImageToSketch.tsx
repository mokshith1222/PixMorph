'use client'

import { useState, useRef } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, PenTool, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToSketch() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<File | null>(null)

  const applySketch = async (imgUrl: string) => {
    return new Promise<string>((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Grayscale
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          data[i] = data[i + 1] = data[i + 2] = gray
        }
        ctx.putImageData(imageData, 0, 0)

        // Edge detection on grayscale
        const grayData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const src = new Uint8ClampedArray(grayData.data)
        const out = grayData.data
        const w = canvas.width
        const h = canvas.height

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const i = (y * w + x) * 4
            const gx =
              -src[(y - 1) * w * 4 + (x - 1) * 4] +
              src[(y - 1) * w * 4 + (x + 1) * 4] +
              -2 * src[y * w * 4 + (x - 1) * 4] +
              2 * src[y * w * 4 + (x + 1) * 4] +
              -src[(y + 1) * w * 4 + (x - 1) * 4] +
              src[(y + 1) * w * 4 + (x + 1) * 4]
            const gy =
              -src[(y - 1) * w * 4 + (x - 1) * 4] +
              -2 * src[(y - 1) * w * 4 + x * 4] +
              -src[(y - 1) * w * 4 + (x + 1) * 4] +
              src[(y + 1) * w * 4 + (x - 1) * 4] +
              2 * src[(y + 1) * w * 4 + x * 4] +
              src[(y + 1) * w * 4 + (x + 1) * 4]
            const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy))
            // Invert: sketch is dark lines on white background
            const val = 255 - mag
            out[i] = out[i + 1] = out[i + 2] = val
          }
        }
        ctx.putImageData(grayData, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = imgUrl
    })
  }

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return
    const file = files[0]
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }
    fileRef.current = file
    const url = URL.createObjectURL(file)
    setOriginal(url)
    setResult(null)
  }

  const handleConvert = async () => {
    if (!original) return
    setLoading(true)
    try {
      const sketchUrl = await applySketch(original)
      setResult(sketchUrl)
      toast.success('Sketch created!')
    } catch {
      toast.error('Failed to create sketch')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result
    link.download = 'sketch.png'
    link.click()
    toast.success('Download started!')
  }

  const handleReset = () => {
    setOriginal(null)
    setResult(null)
    fileRef.current = null
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
          ✏️ Drop an image to convert it into a realistic pencil sketch using edge-detection processing.
        </p>
      </div>

      {!original ? (
        <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Sketch Output</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-24 flex items-center justify-center">
                {result ? (
                  <img src={result} alt="Sketch" className="w-full h-auto max-h-64 object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">Click convert to see result</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              <PenTool className="w-4 h-4 mr-2" />
              {loading ? 'Converting...' : 'Convert to Sketch'}
            </Button>
            <Button variant="ghost" onClick={handleReset}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>

          {result && (
            <Button onClick={handleDownload} variant="secondary" className="w-full">
              <Download className="w-4 h-4 mr-2" />
              Download Sketch
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
