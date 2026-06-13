'use client'

import { useState, useRef } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Smile, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToCartoon() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<File | null>(null)

  const applyCartoon = (imgUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
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

        // Posterize / color quantization (cartoon flat-color look)
        const levels = 6
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.round(data[i] / (256 / levels)) * (256 / levels)
          data[i + 1] = Math.round(data[i + 1] / (256 / levels)) * (256 / levels)
          data[i + 2] = Math.round(data[i + 2] / (256 / levels)) * (256 / levels)
        }
        ctx.putImageData(imageData, 0, 0)

        // Draw black edges on top
        const edgeCanvas = document.createElement('canvas')
        edgeCanvas.width = img.width
        edgeCanvas.height = img.height
        const edgeCtx = edgeCanvas.getContext('2d')!
        edgeCtx.drawImage(img, 0, 0)

        const grayData = edgeCtx.getImageData(0, 0, edgeCanvas.width, edgeCanvas.height)
        const gd = grayData.data
        for (let i = 0; i < gd.length; i += 4) {
          const gray = 0.299 * gd[i] + 0.587 * gd[i + 1] + 0.114 * gd[i + 2]
          gd[i] = gd[i + 1] = gd[i + 2] = gray
        }
        edgeCtx.putImageData(grayData, 0, 0)

        const src = new Uint8ClampedArray(grayData.data)
        const w = edgeCanvas.width
        const h = edgeCanvas.height
        const edgeData = edgeCtx.getImageData(0, 0, w, h)
        const od = edgeData.data

        for (let y = 1; y < h - 1; y++) {
          for (let x = 1; x < w - 1; x++) {
            const i = (y * w + x) * 4
            const dx = Math.abs(src[i] - src[(y * w + x + 1) * 4])
            const dy = Math.abs(src[i] - src[((y + 1) * w + x) * 4])
            const edge = dx + dy > 30 ? 0 : 255
            od[i] = od[i + 1] = od[i + 2] = edge
            od[i + 3] = edge === 0 ? 255 : 0
          }
        }
        edgeCtx.putImageData(edgeData, 0, 0)

        // Combine
        ctx.drawImage(edgeCanvas, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = imgUrl
    })
  }

  const handleFiles = (files: File[]) => {
    if (files.length === 0) return
    const file = files[0]
    if (!file.type.startsWith('image/')) { toast.error('Please select an image'); return }
    fileRef.current = file
    setOriginal(URL.createObjectURL(file))
    setResult(null)
  }

  const handleConvert = async () => {
    if (!original) return
    setLoading(true)
    try {
      const url = await applyCartoon(original)
      setResult(url)
      toast.success('Cartoon created!')
    } catch { toast.error('Failed to create cartoon') }
    finally { setLoading(false) }
  }

  const handleDownload = () => {
    if (!result) return
    const a = document.createElement('a'); a.href = result; a.download = 'cartoon.png'; a.click()
    toast.success('Download started!')
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
        <p className="text-sm text-purple-800 dark:text-purple-200 font-medium">
          🎨 Turns your photo into a cartoon with flat colors and bold outlines using canvas image processing.
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
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Cartoon Output</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 min-h-24 flex items-center justify-center">
                {result ? (
                  <img src={result} alt="Cartoon" className="w-full h-auto max-h-64 object-contain" />
                ) : (
                  <span className="text-gray-400 text-sm">Click convert to see result</span>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              <Smile className="w-4 h-4 mr-2" />
              {loading ? 'Converting...' : 'Convert to Cartoon'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          {result && (
            <Button onClick={handleDownload} variant="secondary" className="w-full">
              <Download className="w-4 h-4 mr-2" />Download Cartoon
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
