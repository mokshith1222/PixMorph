'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import toast from 'react-hot-toast'

export function QRGenerator() {
  const [text, setText] = useState('')
  const [size, setSize] = useState(200)

  const handleDownload = () => {
    const svg = document.querySelector('svg')
    if (svg) {
      const link = document.createElement('a')
      link.download = 'qrcode.svg'
      link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.outerHTML)
      link.click()
      toast.success('QR code downloaded!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Enter URL or Text</label>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com or any text"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">QR Code Size</label>
        <div className="flex gap-2">
          <Button onClick={() => setSize(150)} variant={size === 150 ? 'primary' : 'secondary'}>
            Small
          </Button>
          <Button onClick={() => setSize(200)} variant={size === 200 ? 'primary' : 'secondary'}>
            Medium
          </Button>
          <Button onClick={() => setSize(300)} variant={size === 300 ? 'primary' : 'secondary'}>
            Large
          </Button>
        </div>
      </div>

      {text && (
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-white rounded-lg">
            <QRCodeSVG value={text} size={size} />
          </div>
          <Button onClick={handleDownload} variant="secondary">
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  )
}
