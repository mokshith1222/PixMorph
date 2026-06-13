'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Download, Camera } from 'lucide-react'
import toast from 'react-hot-toast'

export function WebsiteScreenshot() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)

  const handleCapture = async () => {
    if (!url) {
      toast.error('Please enter a website URL')
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const screenshotUrl = `https://api.screenshotmachine.com/?url=${encodeURIComponent(url)}&size=full&format=png`
      setScreenshot(screenshotUrl)
      toast.success('Screenshot captured!')
    } catch {
      toast.error('Failed to capture screenshot')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (screenshot) {
      const link = document.createElement('a')
      link.href = screenshot
      link.download = 'screenshot.png'
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Website URL</label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
      </div>

      <Button onClick={handleCapture} disabled={loading || !url} className="w-full">
        <Camera className="w-4 h-4 mr-2" />
        {loading ? 'Capturing...' : 'Capture Screenshot'}
      </Button>

      {screenshot && (
        <div className="space-y-3">
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <img src={screenshot} alt="Website screenshot" className="w-full h-auto" />
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Screenshot
          </Button>
        </div>
      )}
    </div>
  )
}
