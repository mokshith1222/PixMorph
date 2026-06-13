'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToSepia() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState(100)

  const apply = (imgUrl: string, s: number): Promise<string> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const d = ctx.getImageData(0, 0, c.width, c.height)
      const f = s / 100
      for (let i = 0; i < d.data.length; i += 4) {
        const r = d.data[i], g = d.data[i + 1], b = d.data[i + 2]
        const sr = Math.min(255, r * (1 - 0.607 * f) + g * (0.769 * f) + b * (0.189 * f))
        const sg = Math.min(255, r * (0.349 * f) + g * (1 - 0.314 * f) + b * (0.168 * f))
        const sb = Math.min(255, r * (0.272 * f) + g * (0.534 * f) + b * (1 - 0.869 * f))
        d.data[i] = sr; d.data[i + 1] = sg; d.data[i + 2] = sb
      }
      ctx.putImageData(d, 0, 0)
      resolve(c.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = imgUrl
  })

  const handleFiles = (files: File[]) => {
    if (!files[0]?.type.startsWith('image/')) { toast.error('Please select an image'); return }
    setOriginal(URL.createObjectURL(files[0])); setResult(null)
  }

  const handleConvert = async () => {
    if (!original) return
    setLoading(true)
    try { setResult(await apply(original, strength)); toast.success('Sepia filter applied!') }
    catch { toast.error('Failed to apply sepia') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">🟤 Applies a warm vintage sepia tone to your photo.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Sepia Strength: {strength}%</label>
            <input type="range" min={0} max={100} value={strength}
              onChange={e => { setStrength(+e.target.value); setResult(null) }}
              className="w-full accent-yellow-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Sepia Output</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                {result ? <img src={result} alt="Sepia" className="w-full h-auto max-h-64 object-contain" /> : <span className="text-gray-400 text-sm">Result appears here</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              {loading ? 'Applying...' : 'Apply Sepia'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'sepia.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download Sepia Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
