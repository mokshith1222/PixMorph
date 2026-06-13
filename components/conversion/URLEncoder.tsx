'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function URLEncoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const encoded = encodeURIComponent(input)
        setOutput(encoded)
        toast.success('Encoded successfully!')
      } else {
        const decoded = decodeURIComponent(input)
        setOutput(decoded)
        toast.success('Decoded successfully!')
      }
    } catch {
      toast.error('Invalid input for URL ' + mode)
    }
  }

  const handleCopy = () => {
    if (output) {
      void navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          onClick={() => setMode('encode')}
          variant={mode === 'encode' ? 'primary' : 'secondary'}
          className="flex-1"
        >
          Encode
        </Button>
        <Button
          onClick={() => setMode('decode')}
          variant={mode === 'decode' ? 'primary' : 'secondary'}
          className="flex-1"
        >
          Decode
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter URL to encode' : 'Enter encoded URL to decode'}
          className="min-h-[150px] font-mono"
        />
      </div>

      <Button onClick={handleProcess} className="w-full">
        {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
      </Button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Output</label>
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
