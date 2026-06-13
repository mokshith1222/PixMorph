'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState<number>(2)

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indent)
      setOutput(formatted)
      toast.success('JSON formatted successfully!')
    } catch (error) {
      toast.error('Invalid JSON: ' + (error as Error).message)
    }
  }

  const handleCopy = () => {
    if (output) {
      void navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    }
  }

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      toast.success('JSON minified!')
    } catch (error) {
      toast.error('Invalid JSON: ' + (error as Error).message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Input JSON</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className="min-h-[150px] font-mono"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFormat} className="flex-1">
          Format JSON
        </Button>
        <Button onClick={handleMinify} variant="secondary">
          Minify
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Indentation</label>
        <div className="flex gap-2">
          <Button onClick={() => setIndent(2)} variant={indent === 2 ? 'primary' : 'secondary'} size="sm">
            2 spaces
          </Button>
          <Button onClick={() => setIndent(4)} variant={indent === 4 ? 'primary' : 'secondary'} size="sm">
            4 spaces
          </Button>
        </div>
      </div>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Formatted JSON</label>
            <Button onClick={handleCopy} variant="ghost" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea value={output} readOnly className="min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" />
        </div>
      )}
    </div>
  )
}
