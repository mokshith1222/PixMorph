'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw, FlipHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageMirror() {
  const [original, setOriginal] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<'horizontal' | 'vertical'>('horizontal')

  const apply = (imgUrl: string, m: 'horizontal' | 'vertical'): Promise<string> => new Promise((resolve, reject) => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = img.width; c.height = img.height
      const ctx = c.getContext('2d')!
      ctx.save()
      if (m === 'horizontal') { ctx.translate(c.width, 0); ctx.scale(-1, 1) }
      else { ctx.translate(0, c.height); ctx.scale(1, -1) }
      ctx.drawImage(img, 0, 0)
      ctx.restore()
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
    try { setResult(await apply(original, mode)); toast.success('Image mirrored!') }
    catch { toast.error('Failed to mirror image') } finally { setLoading(false) }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
        <p className="text-sm text-indigo-800 dark:text-indigo-200 font-medium">🪞 Mirror your image horizontally or vertically with instant canvas transform.</p>
      </div>
      {!original ? <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} /> : (
        <div className="space-y-6">
          <div className="flex gap-3">
            {(['horizontal', 'vertical'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setResult(null) }}
                className={`flex-1 py-2 px-4 rounded-lg border text-sm font-medium transition-colors ${mode === m ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'}`}>
                {m === 'horizontal' ? '↔ Horizontal' : '↕ Vertical'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Original</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={original} alt="Original" className="w-full h-auto max-h-64 object-contain" />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-2">Mirrored</p>
              <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-24 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                {result ? <img src={result} alt="Mirrored" className="w-full h-auto max-h-64 object-contain" /> : <span className="text-gray-400 text-sm">Result appears here</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              <FlipHorizontal className="w-4 h-4 mr-2" />
              {loading ? 'Mirroring...' : 'Mirror Image'}
            </Button>
            <Button variant="ghost" onClick={() => { setOriginal(null); setResult(null) }}><RefreshCw className="w-4 h-4" /></Button>
          </div>
          {result && (
            <Button variant="secondary" className="w-full" onClick={() => {
              const a = document.createElement('a'); a.href = result!; a.download = 'mirrored.png'; a.click()
              toast.success('Download started!')
            }}>
              <Download className="w-4 h-4 mr-2" />Download Mirrored Image
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
