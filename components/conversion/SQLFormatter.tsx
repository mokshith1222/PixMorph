'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy, Download } from 'lucide-react'
import { format } from 'sql-formatter'
import toast from 'react-hot-toast'

export function SQLFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleFormat = () => {
    if (!input) {
      toast.error('Please enter SQL query')
      return
    }

    try {
      const formatted = format(input, {
        language: 'sql',
        tabWidth: 2,
        keywordCase: 'upper',
      })
      setOutput(formatted)
      toast.success('SQL formatted!')
    } catch {
      toast.error('Invalid SQL format')
    }
  }

  const handleCopy = () => {
    if (output) {
      void navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    }
  }

  const handleDownload = () => {
    if (output) {
      const blob = new Blob([output as any], { type: 'text/sql' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'formatted.sql'
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">SQL Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your SQL query here..."
          className="min-h-[150px] font-mono"
        />
      </div>

      <Button onClick={handleFormat} className="w-full">
        Format SQL
      </Button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Formatted SQL</label>
            <div className="flex gap-2">
              <Button onClick={handleCopy} variant="ghost" size="sm">
                <Copy className="w-4 h-4" />
              </Button>
              <Button onClick={handleDownload} variant="ghost" size="sm">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Textarea value={output} readOnly className="min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" />
        </div>
      )}
    </div>
  )
}
