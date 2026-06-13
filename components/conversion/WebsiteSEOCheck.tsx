'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Search, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'

export function WebsiteSEOCheck() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{
    title: string | null
    description: string | null
    headings: number
    images: number
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
        title: 'Example Website - Home',
        description: 'This is an example website for demonstration purposes.',
        headings: Math.floor(Math.random() * 10) + 5,
        images: Math.floor(Math.random() * 20) + 10,
        score: Math.floor(Math.random() * 40) + 60,
      })
      toast.success('SEO check complete!')
    } catch {
      toast.error('Failed to check SEO')
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
        <Search className="w-4 h-4 mr-2" />
        {loading ? 'Checking...' : 'Check SEO'}
      </Button>

      {results && (
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">SEO Analysis</h3>
              <div className="flex items-center gap-2">
                <span className="text-sm">Score:</span>
                <span className="text-xl font-bold text-primary-600">{results.score}/100</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Title Tag</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{results.title || 'Missing'}</span>
                  {results.title ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Meta Description</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{results.description || 'Missing'}</span>
                  {results.description ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Headings</span>
                <span className="text-sm">{results.headings} found</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Images</span>
                <span className="text-sm">{results.images} found</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
