'use client'

import { useState, useRef } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Brush, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToPainting() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [intensity, setIntensity] = useState(3)

  const applyPainting = (imgUrl: string, radius: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)

        const src = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const dst = ctx.createImageData(canvas.width, canvas.height)
        const w = canvas.width
        const h = canvas.height
        const sd = src.data
        const dd = dst.data

        // Oil-paint like effect: for each pixel pick most frequent color in neighborhood
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            const buckets: Record<string, { r: number; g: number; b: number; count: number }> = {}
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const nx = Math.max(0, Math.min(w - 1, x + dx))
                const ny = Math.max(0, Math.min(h - 1, y + dy))
                const idx = (ny * w + nx) * 4
                const r = Math.round(sd[idx] / 32) * 32
                const g = Math.round(sd[idx + 1] / 32) * 32
                const b = Math.round(sd[idx + 2] / 32) * 32
                const key = `${r},${g},${b}`
                if (!buckets[key]) buckets[key] = { r, g, b, count: 0 }
                buckets[key].count++
              }
            }
            let best = Object.values(buckets).reduce((a, b) => (b.count > a.count ? b : a))
            const oi = (y * w + x) * 4
            dd[oi] = best.r
            dd[oi + 1] = best.g
            dd[oi + 2] = best.b
            dd[oi + 3] = 255
          }
        }
        ctx.putImageData(dst, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      }
      img.onerror = reject
      img.src = imgUrl
    })
  }

  const handleFiles = (files: File[]) => {
    if (!files[0]?.type.startsWith('image/')) { toast.error('Please select an image'); return }
    setOriginal(URL.createObjectURL(files[0]))
    setResult(null)
  }

  const handleConvert = async () => {
    if (!original) return
    setLoading(true)
    try {
      const url = await applyPainting(original, intensity)
      setResult(url)
      toast.success('Painting created!')
    } catch { toast.error('Failed to create painting') }
    finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
        <p className="text-sm text-orange-800 dark:text-orange-200 font-medium">
          🖌️ Transforms your photo into an oil painting effect using neighbor color averaging.
        </p>
      </div>

      {!original ? (
        <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} />
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Brush Intensity: {intensity}</label>
            <input type="range" min={1} max={5} value={intensity}
              onChange={e => { setIntensity(+e.target.value); setResult(null) }}
              className="w-full accent-orange-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Painting</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 min-h-24 flex items-center justify-center">
                {result ? (
                  <img src={result} alt="Painting" className="w-full h-auto max-h-64 object-contain" />
                ) : <span className="text-gray-400 text-sm p-4 text-center">Click convert to see painting effect</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              <Brush className="w-4 h-4 mr-2" />
              {loading ? 'Painting...' : 'Convert to Painting'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'painting.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download Painting
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
