'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy, Download } from 'lucide-react'
import toast from 'react-hot-toast'

type CodeLanguage = 'javascript' | 'html' | 'css' | 'json'

const extensionMap: Record<CodeLanguage, string> = {
  javascript: 'js',
  html: 'html',
  css: 'css',
  json: 'json',
}

function minifyCss(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .trim()
}

function minifyHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim()
}

export function CodeMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<CodeLanguage>('javascript')
  const [minifying, setMinifying] = useState(false)

  const handleMinify = async () => {
    if (!input) {
      toast.error('Please enter code')
      return
    }

    setMinifying(true)

    try {
      let minified = ''
      if (language === 'javascript') {
        const { minify } = await import('terser')
        const result = await minify(input, {
          compress: true,
          mangle: true,
        })
        minified = result.code ?? ''
      } else if (language === 'html') {
        minified = minifyHtml(input)
      } else if (language === 'css') {
        minified = minifyCss(input)
      } else {
        const parsed: unknown = JSON.parse(input)
        minified = JSON.stringify(parsed)
      }
      setOutput(minified)
      toast.success('Code minified!')
    } catch {
      toast.error('Invalid code format')
    } finally {
      setMinifying(false)
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
      const extension = extensionMap[language]
      const blob = new Blob([output], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `minified.${extension}`
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Code Input</label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your code here..."
          className="min-h-[150px] font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Language</label>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => setLanguage('javascript')}
            variant={language === 'javascript' ? 'primary' : 'secondary'}
          >
            JavaScript
          </Button>
          <Button onClick={() => setLanguage('html')} variant={language === 'html' ? 'primary' : 'secondary'}>
            HTML
          </Button>
          <Button onClick={() => setLanguage('css')} variant={language === 'css' ? 'primary' : 'secondary'}>
            CSS
          </Button>
          <Button onClick={() => setLanguage('json')} variant={language === 'json' ? 'primary' : 'secondary'}>
            JSON
          </Button>
        </div>
      </div>

      <Button onClick={handleMinify} disabled={minifying} className="w-full">
        {minifying ? 'Minifying...' : 'Minify Code'}
      </Button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Minified Code</label>
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
