'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageBlurrer() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [radius, setRadius] = useState(5)

  const apply = (imgUrl: string, r: number): Promise<string> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')!
      ctx.filter = `blur(${r}px)`
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
    try { setResult(await apply(original, radius)); toast.success('Blur applied!') }
    catch { toast.error('Failed to blur image') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">🌫️ Apply a Gaussian blur effect to your image. Adjust radius for different intensities.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Blur Radius: {radius}px</label>
            <input type="range" min={1} max={30} value={radius}
              onChange={e => { setRadius(+e.target.value); setResult(null) }}
              className="w-full accent-blue-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Blurred</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                {result ? <img src={result} alt="Blurred" className="w-full h-auto max-h-64 object-contain" /> : <span className="text-gray-400 text-sm">Result appears here</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              {loading ? 'Blurring...' : 'Apply Blur'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'blurred.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download Blurred Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
