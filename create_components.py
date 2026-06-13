import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph"

files = {
    "components/conversion/ImageColorExtractor.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Palette } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageColorExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [colors, setColors] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setColors([])
    }
  }

  const handleExtract = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (!imageData) return

      const data = imageData.data
      const colorMap: Record<string, number> = {}
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i+1]
        const b = data[i+2]
        const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
        colorMap[hex] = (colorMap[hex] || 0) + 1
      }

      const sortedColors = Object.entries(colorMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([color]) => color)

      setColors(sortedColors)
      toast.success(`Extracted ${sortedColors.length} colors!`)
    } catch (error) {
      toast.error('Failed to extract colors')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🎨 Upload an image to extract its color palette.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleExtract} disabled={!file || loading} className="w-full">
        <Palette className="w-4 h-4 mr-2" />
        {loading ? 'Extracting...' : 'Extract Colors'}
      </Button>

      {colors.length > 0 && (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="font-medium text-green-600 dark:text-green-400">
              🎨 Color Palette
            </span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color, index) => (
              <div key={index} className="space-y-1">
                <div 
                  className="w-full h-12 rounded-lg"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs font-mono">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageToSketch.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, PenTool } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToSketch() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]
          data[i] = gray
          data[i+1] = gray
          data[i+2] = gray
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const sketchCanvas = document.createElement('canvas')
      sketchCanvas.width = img.width
      sketchCanvas.height = img.height
      const sketchCtx = sketchCanvas.getContext('2d')
      sketchCtx?.drawImage(canvas, 0, 0)

      const sketchData = sketchCtx?.getImageData(0, 0, sketchCanvas.width, sketchCanvas.height)
      if (sketchData) {
        const data = sketchData.data
        const width = sketchCanvas.width
        const height = sketchCanvas.height
        const temp = new Uint8ClampedArray(data)

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4
            const dx = (temp[idx] - temp[(y * width + (x+1)) * 4]) / 2
            const dy = (temp[idx] - temp[((y+1) * width + x) * 4]) / 2
            const magnitude = Math.sqrt(dx*dx + dy*dy)
            data[idx] = magnitude
            data[idx+1] = magnitude
            data[idx+2] = magnitude
          }
        }
        sketchCtx?.putImageData(sketchData, 0, 0)
      }

      const resultUrl = sketchCanvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Sketch created!')
    } catch (error) {
      toast.error('Failed to create sketch')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'sketch.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          ✏️ Upload an image to convert it into a pencil sketch.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
        <PenTool className="w-4 h-4 mr-2" />
        {loading ? 'Converting...' : 'Convert to Sketch'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Sketch" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Sketch
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageToCartoon.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Smile } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToCartoon() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        const colors = 8
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.round(data[i] / (256 / colors)) * (256 / colors)
          data[i+1] = Math.round(data[i+1] / (256 / colors)) * (256 / colors)
          data[i+2] = Math.round(data[i+2] / (256 / colors)) * (256 / colors)
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const cartoonCanvas = document.createElement('canvas')
      cartoonCanvas.width = img.width
      cartoonCanvas.height = img.height
      const cartoonCtx = cartoonCanvas.getContext('2d')
      cartoonCtx?.drawImage(canvas, 0, 0)

      const cartoonData = cartoonCtx?.getImageData(0, 0, cartoonCanvas.width, cartoonCanvas.height)
      if (cartoonData) {
        const data = cartoonData.data
        const width = cartoonCanvas.width
        const height = cartoonCanvas.height
        const temp = new Uint8ClampedArray(data)

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4
            const dx = Math.abs(temp[idx] - temp[(y * width + (x+1)) * 4])
            const dy = Math.abs(temp[idx] - temp[((y+1) * width + x) * 4])
            const edge = Math.min(255, (dx + dy) * 2)
            data[idx] = Math.max(data[idx], edge)
            data[idx+1] = Math.max(data[idx+1], edge)
            data[idx+2] = Math.max(data[idx+2], edge)
          }
        }
        cartoonCtx?.putImageData(cartoonData, 0, 0)
      }

      const resultUrl = cartoonCanvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Cartoon created!')
    } catch (error) {
      toast.error('Failed to create cartoon')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'cartoon.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🎨 Upload an image to convert it into a cartoon style.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
        <Smile className="w-4 h-4 mr-2" />
        {loading ? 'Converting...' : 'Convert to Cartoon'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Cartoon" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Cartoon
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageToPainting.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Brush } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToPainting() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        const width = canvas.width
        const height = canvas.height
        const temp = new Uint8ClampedArray(data)

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4
            let r = 0, g = 0, b = 0, count = 0
            const radius = 3
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const nx = x + dx
                const ny = y + dy
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const nidx = (ny * width + nx) * 4
                  r += temp[nidx]
                  g += temp[nidx + 1]
                  b += temp[nidx + 2]
                  count++
                }
              }
            }
            data[idx] = r / count
            data[idx+1] = g / count
            data[idx+2] = b / count
          }
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Painting created!')
    } catch (error) {
      toast.error('Failed to create painting')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'painting.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🎨 Upload an image to convert it into an oil painting style.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
        <Brush className="w-4 h-4 mr-2" />
        {loading ? 'Converting...' : 'Convert to Painting'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Painting" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Painting
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageToBW.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToBW() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]
          data[i] = gray
          data[i+1] = gray
          data[i+2] = gray
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Converted to B&W!')
    } catch (error) {
      toast.error('Failed to convert to B&W')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'bw-image.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          ⚫ Upload an image to convert it to black and white.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
        <ImageIcon className="w-4 h-4 mr-2" />
        {loading ? 'Converting...' : 'Convert to B&W'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="B&W" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download B&W Image
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageToSepia.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Sunset } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageToSepia() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i+1]
          const b = data[i+2]
          data[i] = Math.min(255, r * 0.393 + g * 0.769 + b * 0.189)
          data[i+1] = Math.min(255, r * 0.349 + g * 0.686 + b * 0.168)
          data[i+2] = Math.min(255, r * 0.272 + g * 0.534 + b * 0.131)
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Sepia effect applied!')
    } catch (error) {
      toast.error('Failed to apply sepia effect')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'sepia-image.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🌅 Upload an image to apply a vintage sepia effect.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleConvert} disabled={!file || loading} className="w-full">
        <Sunset className="w-4 h-4 mr-2" />
        {loading ? 'Applying...' : 'Apply Sepia'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Sepia" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Sepia Image
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageMirror.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, MoveHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageMirror() {
  const [file, setFile] = useState<File | null>(null)
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleMirror = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      if (direction === 'horizontal') {
        ctx?.translate(canvas.width, 0)
        ctx?.scale(-1, 1)
      } else {
        ctx?.translate(0, canvas.height)
        ctx?.scale(1, -1)
      }
      ctx?.drawImage(img, 0, 0)

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success(`Mirrored ${direction}ly!`)
    } catch (error) {
      toast.error('Failed to mirror image')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = `mirrored-${direction}.png`
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🪞 Upload an image to mirror it horizontally or vertically.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Mirror Direction</label>
        <div className="flex gap-2">
          <Button 
            onClick={() => setDirection('horizontal')} 
            variant={direction === 'horizontal' ? 'primary' : 'secondary'}
          >
            Horizontal
          </Button>
          <Button 
            onClick={() => setDirection('vertical')} 
            variant={direction === 'vertical' ? 'primary' : 'secondary'}
          >
            Vertical
          </Button>
        </div>
      </div>

      <Button onClick={handleMirror} disabled={!file || loading} className="w-full">
        <MoveHorizontal className="w-4 h-4 mr-2" />
        {loading ? 'Mirroring...' : 'Mirror Image'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Mirrored" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Mirrored Image
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageBlurrer.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Blur } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageBlurrer() {
  const [file, setFile] = useState<File | null>(null)
  const [blurRadius, setBlurRadius] = useState<number>(5)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleBlur = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        const width = canvas.width
        const height = canvas.height
        const temp = new Uint8ClampedArray(data)
        const radius = Math.floor(blurRadius)
        const size = radius * 2 + 1
        
        for (let y = radius; y < height - radius; y++) {
          for (let x = radius; x < width - radius; x++) {
            let r = 0, g = 0, b = 0
            for (let ky = -radius; ky <= radius; ky++) {
              for (let kx = -radius; kx <= radius; kx++) {
                const idx = ((y + ky) * width + (x + kx)) * 4
                r += temp[idx]
                g += temp[idx + 1]
                b += temp[idx + 2]
              }
            }
            const idx = (y * width + x) * 4
            data[idx] = r / (size * size)
            data[idx + 1] = g / (size * size)
            data[idx + 2] = b / (size * size)
          }
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Image blurred!')
    } catch (error) {
      toast.error('Failed to blur image')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'blurred-image.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🌫️ Upload an image to apply a blur effect.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Blur Radius</label>
        <div className="flex gap-2">
          <Button onClick={() => setBlurRadius(3)} variant={blurRadius === 3 ? 'primary' : 'secondary'}>
            Low
          </Button>
          <Button onClick={() => setBlurRadius(5)} variant={blurRadius === 5 ? 'primary' : 'secondary'}>
            Medium
          </Button>
          <Button onClick={() => setBlurRadius(10)} variant={blurRadius === 10 ? 'primary' : 'secondary'}>
            High
          </Button>
        </div>
      </div>

      <Button onClick={handleBlur} disabled={!file || loading} className="w-full">
        <Blur className="w-4 h-4 mr-2" />
        {loading ? 'Blurring...' : 'Blur Image'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Blurred" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Blurred Image
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageFlip.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, FlipVertical } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageFlip() {
  const [file, setFile] = useState<File | null>(null)
  const [direction, setDirection] = useState<'vertical' | 'horizontal'>('vertical')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleFlip = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')

      ctx?.drawImage(img, 0, 0)
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)

      if (imageData) {
        const data = imageData.data
        const width = canvas.width
        const height = canvas.height
        const temp = new Uint8ClampedArray(data)

        if (direction === 'vertical') {
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const srcIdx = (y * width + x) * 4
              const dstIdx = ((height - 1 - y) * width + x) * 4
              data[dstIdx] = temp[srcIdx]
              data[dstIdx + 1] = temp[srcIdx + 1]
              data[dstIdx + 2] = temp[srcIdx + 2]
              data[dstIdx + 3] = temp[srcIdx + 3]
            }
          }
        } else {
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const srcIdx = (y * width + x) * 4
              const dstIdx = (y * width + (width - 1 - x)) * 4
              data[dstIdx] = temp[srcIdx]
              data[dstIdx + 1] = temp[srcIdx + 1]
              data[dstIdx + 2] = temp[srcIdx + 2]
              data[dstIdx + 3] = temp[srcIdx + 3]
            }
          }
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success(`Flipped ${direction}ly!`)
    } catch (error) {
      toast.error('Failed to flip image')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = `flipped-${direction}.png`
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          🔄 Upload an image to flip it vertically or horizontally.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Flip Direction</label>
        <div className="flex gap-2">
          <Button 
            onClick={() => setDirection('vertical')} 
            variant={direction === 'vertical' ? 'primary' : 'secondary'}
          >
            Vertical
          </Button>
          <Button 
            onClick={() => setDirection('horizontal')} 
            variant={direction === 'horizontal' ? 'primary' : 'secondary'}
          >
            Horizontal
          </Button>
        </div>
      </div>

      <Button onClick={handleFlip} disabled={!file || loading} className="w-full">
        <FlipVertical className="w-4 h-4 mr-2" />
        {loading ? 'Flipping...' : 'Flip Image'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Flipped" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Flipped Image
          </Button>
        </div>
      )}
    </div>
  )
}
""",
    "components/conversion/ImageBrightnessContrast.tsx": """'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, Sun } from 'lucide-react'
import toast from 'react-hot-toast'

export function ImageBrightnessContrast() {
  const [file, setFile] = useState<File | null>(null)
  const [brightness, setBrightness] = useState<number>(0)
  const [contrast, setContrast] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleAdjust = async () => {
    if (!file) {
      toast.error('Please select an image')
      return
    }

    setLoading(true)

    try {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.src = url
      await new Promise(resolve => img.onload = resolve)

      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)

      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height)
      if (imageData) {
        const data = imageData.data
        const b = brightness
        const c = contrast
        const factor = (259 * (c + 255)) / (255 * (259 - c))

        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, factor * (data[i] - 128) + 128 + b))
          data[i+1] = Math.min(255, Math.max(0, factor * (data[i+1] - 128) + 128 + b))
          data[i+2] = Math.min(255, Math.max(0, factor * (data[i+2] - 128) + 128 + b))
        }
        ctx?.putImageData(imageData, 0, 0)
      }

      const resultUrl = canvas.toDataURL('image/png')
      setResult(resultUrl)
      toast.success('Image adjusted!')
    } catch (error) {
      toast.error('Failed to adjust image')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = 'adjusted-image.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          ☀️ Upload an image to adjust its brightness and contrast.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="image/*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium flex justify-between">
            <span>Brightness</span>
            <span>{brightness}</span>
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="text-sm font-medium flex justify-between">
            <span>Contrast</span>
            <span>{contrast}</span>
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <Button onClick={handleAdjust} disabled={!file || loading} className="w-full">
        <Sun className="w-4 h-4 mr-2" />
        {loading ? 'Adjusting...' : 'Adjust Image'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={result} alt="Adjusted" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Adjusted Image
          </Button>
        </div>
      )}
    </div>
  )
}
"""
}

for rel_path, content in files.items():
    full_path = os.path.join(base_dir, rel_path.replace('/', os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Components created!")
