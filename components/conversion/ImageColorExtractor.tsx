'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageColorExtractor() {
  const [original, setOriginal] = useState<string | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const extractColors = (imgUrl: string, count = 12): Promise<string[]> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      const MAX = 100
      const scale = Math.min(MAX / img.width, MAX / img.height)
      c.width = Math.round(img.width * scale)
      c.height = Math.round(img.height * scale)
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0, c.width, c.height)
      const d = ctx.getImageData(0, 0, c.width, c.height).data

      // Sample pixels and quantize to palette
      const freq: Record<string, number> = {}
      for (let i = 0; i < d.length; i += 4) {
        if (d[i + 3] < 128) continue
        // Quantize to 32-step buckets
        const r = Math.round(d[i] / 32) * 32
        const g = Math.round(d[i + 1] / 32) * 32
        const b = Math.round(d[i + 2] / 32) * 32
        const key = `${r},${g},${b}`
        freq[key] = (freq[key] || 0) + 1
      }
      const sorted = Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, count)
        .map(([k]) => {
          const [r, g, b] = k.split(',').map(Number)
          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        })
      resolve(sorted)
    }
    img.onerror = reject
    img.src = imgUrl
  })

  const handleFiles = async (files: File[]) => {
    if (!files[0]?.type.startsWith('image/')) { toast.error('Please select an image'); return }
    const url = URL.createObjectURL(files[0])
    setOriginal(url); setColors([])
    setLoading(true)
    try {
      const extracted = await extractColors(url)
      setColors(extracted)
      toast.success(`Extracted ${extracted.length} colors!`)
    } catch { toast.error('Failed to extract colors') }
    finally { setLoading(false) }
  }

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex)
    toast.success(`Copied ${hex}!`)
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-200 dark:border-pink-800">
        <p className="text-sm text-pink-800 dark:text-pink-200 font-medium">🎨 Drop an image to automatically extract its dominant color palette.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <img src={original} alt="Uploaded" className="w-full h-auto max-h-48 object-contain" />
          </div>
          {loading ? (
            <p className="text-center text-gray-500 text-sm">Extracting colors...</p>
          ) : colors.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-3">Dominant Colors (click to copy)</p>
              <div className="grid grid-cols-4 gap-3">
                {colors.map((hex, i) => (
                  <button key={i} onClick={() => copyColor(hex)} className="group flex flex-col items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform">
                    <div className="w-full h-14 rounded-lg shadow-sm" style={{ backgroundColor: hex }} />
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 group-hover:text-primary-600">{hex}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button variant="ghost" onClick={() => { setOriginal(null); setColors([]) }} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />Try Another Image
          </Button>
        </div>
      )}
    </div>
  )
}
