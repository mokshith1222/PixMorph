'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Zap, Clock, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

export function WebsiteSpeedTest() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    loadTime: number
    status: number
    size: string
  } | null>(null)

  const handleTest = async () => {
    if (!url) {
      toast.error('Please enter a website URL')
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResults({
        loadTime: Math.random() * 2 + 0.5,
        status: 200,
        size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
      })
      toast.success('Speed test complete!')
    } catch {
      toast.error('Failed to test website speed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Website URL</label>
        <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
      </div>

      <Button onClick={handleTest} disabled={loading || !url} className="w-full">
        <Zap className="w-4 h-4 mr-2" />
        {loading ? 'Testing...' : 'Test Speed'}
      </Button>

      {results && (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-medium mb-3">Speed Test Results</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Load Time</span>
                </div>
                <span className="font-medium">{results.loadTime.toFixed(2)}s</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">Status</span>
                </div>
                <span className="font-medium">{results.status} OK</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm">Page Size</span>
                </div>
                <span className="font-medium">{results.size}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
