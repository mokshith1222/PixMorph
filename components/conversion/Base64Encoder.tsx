'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy, Upload } from 'lucide-react'
import toast from 'react-hot-toast'

export function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleProcess = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)))
        setOutput(encoded)
        toast.success('Encoded successfully!')
      } else {
        const decoded = decodeURIComponent(escape(atob(input)))
        setOutput(decoded)
        toast.success('Decoded successfully!')
      }
    } catch {
      toast.error('Invalid input for Base64 ' + mode)
    }
  }

  const handleCopy = () => {
    if (output) {
      void navigator.clipboard.writeText(output)
      toast.success('Copied to clipboard!')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setInput(result)
    }
    reader.readAsDataURL(file)
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
          placeholder={mode === 'encode' ? 'Enter text to encode' : 'Enter Base64 to decode'}
          className="min-h-[150px] font-mono"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleProcess} className="flex-1">
          {mode === 'encode' ? 'Encode to Base64' : 'Decode from Base64'}
        </Button>
        <div className="relative">
          <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          <Button variant="secondary">
            <Upload className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
