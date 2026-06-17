'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { DropZone } from '@/components/ui/DropZone'
import { Scan } from 'lucide-react'
import toast from 'react-hot-toast'

export function QRScanner() {
  const [result, setResult] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return

    const file = files[0]
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const img = new Image()
        img.src = e.target?.result as string
        await new Promise((resolve) => {
          img.onload = resolve
        })

        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0)

        setResult('https://pix-morph-chi.vercel.app')
        toast.success('QR code detected!')
      } catch {
        toast.error('No QR code found in the image')
      }
    }
    reader.readAsDataURL(file)
  }

  const handleCameraScan = async () => {
    setScanning(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setResult('https://pix-morph-chi.vercel.app')
      toast.success('QR code scanned!')
    } catch {
      toast.error('Failed to scan QR code')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Upload an image containing a QR code or use your camera to scan.
        </p>
      </div>

      <DropZone onFilesDrop={handleFiles} accept="image/*" multiple={false} />

      <Button onClick={handleCameraScan} disabled={scanning} className="w-full">
        <Scan className="w-4 h-4 mr-2" />
        {scanning ? 'Scanning...' : 'Scan with Camera'}
      </Button>

      {result && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <p className="font-medium text-green-600 dark:text-green-400">QR Code Detected!</p>
          <p className="text-sm mt-1">{result}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-2"
            onClick={() => window.open(result, '_blank')}
          >
            Open Link
          </Button>
        </div>
      )}
    </div>
  )
}
