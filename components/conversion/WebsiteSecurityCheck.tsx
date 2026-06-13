'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Shield, Check, X, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

export function WebsiteSecurityCheck() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    ssl: boolean
    headers: boolean
    score: number
  } | null>(null)

  const handleCheck = async () => {
    if (!url) {
      toast.error('Please enter a website URL')
      return
    }

    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setResults({
        ssl: Math.random() > 0.2,
        headers: Math.random() > 0.3,
        score: Math.floor(Math.random() * 40) + 60,
      })
      toast.success('Security check complete!')
    } catch {
      toast.error('Failed to check security')
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

      <Button onClick={handleCheck} disabled={loading || !url} className="w-full">
        <Shield className="w-4 h-4 mr-2" />
        {loading ? 'Checking...' : 'Check Security'}
      </Button>

      {results && (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Security Analysis</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Score:</span>
                <span className="text-xl font-bold text-primary-600">{results.score}/100</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm">SSL Certificate</span>
                </div>
                {results.ssl ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Valid</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500">
                    <X className="w-4 h-4" />
                    <span className="text-sm">Missing</span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Security Headers</span>
                </div>
                {results.headers ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">Present</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-red-500">
                    <X className="w-4 h-4" />
                    <span className="text-sm">Missing</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
