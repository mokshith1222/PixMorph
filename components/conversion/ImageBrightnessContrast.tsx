'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw, Sun } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageBrightnessContrast() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)

  const apply = (imgUrl: string, b: number, co: number): Promise<string> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')!
      ctx.filter = `brightness(${b}%) contrast(${co}%)`
      ctx.drawImage(img, 0, 0)
      ctx.filter = 'none'
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
    try { setResult(await apply(original, brightness, contrast)); toast.success('Adjustments applied!') }
    catch { toast.error('Failed to adjust image') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">☀️ Adjust the brightness and contrast of your image in real time.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Brightness: {brightness}%</label>
              <input type="range" min={0} max={200} value={brightness}
                onChange={e => { setBrightness(+e.target.value); setResult(null) }}
                className="w-full accent-amber-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contrast: {contrast}%</label>
              <input type="range" min={0} max={200} value={contrast}
                onChange={e => { setContrast(+e.target.value); setResult(null) }}
                className="w-full accent-amber-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Preview (live)</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Preview" style={{ filter: `brightness(${brightness}%) contrast(${contrast}%)` }} className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              <Sun className="w-4 h-4 mr-2" />
              {loading ? 'Processing...' : 'Apply & Save'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null); setBrightness(100); setContrast(100) }}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'adjusted.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
