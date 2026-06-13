'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToBW() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const apply = (imgUrl: string): Promise<string> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const d = ctx.getImageData(0, 0, c.width, c.height)
      for (let i = 0; i < d.data.length; i += 4) {
        const g = 0.299 * d.data[i] + 0.587 * d.data[i + 1] + 0.114 * d.data[i + 2]
        d.data[i] = d.data[i + 1] = d.data[i + 2] = g
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
    try { setResult(await apply(original)); toast.success('Converted to B&W!') }
    catch { toast.error('Failed to convert') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">⬛ Converts your image to true grayscale black & white using luminance weighting.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">B&W Output</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                {result ? <img src={result} alt="BW" className="w-full h-auto max-h-64 object-contain" /> : <span className="text-gray-400 text-sm">Result appears here</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              {loading ? 'Converting...' : 'Convert to B&W'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'bw.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download B&W Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
