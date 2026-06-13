'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Copy, Download } from 'lucide-react'
import { js, html, css } from 'js-beautify'
import toast from 'react-hot-toast'

type CodeLanguage = 'javascript' | 'html' | 'css' | 'json'

const extensionMap: Record<CodeLanguage, string> = {
  javascript: 'js',
  html: 'html',
  css: 'css',
  json: 'json',
}

export function CodeBeautifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<CodeLanguage>('javascript')

  const handleFormat = () => {
    if (!input) {
      toast.error('Please enter code')
      return
    }

    try {
      let formatted = ''
      if (language === 'javascript') {
        formatted = js(input, {
          indent_size: 2,
          indent_char: ' ',
          space_in_empty_paren: true,
          jslint_happy: false,
        })
      } else if (language === 'html') {
        formatted = html(input, {
          indent_size: 2,
          indent_char: ' ',
          max_preserve_newlines: 2,
          preserve_newlines: true,
          wrap_line_length: 80,
        })
      } else if (language === 'css') {
        formatted = css(input, {
          indent_size: 2,
          indent_char: ' ',
          selector_separator_newline: true,
          end_with_newline: true,
        })
      } else {
        const parsed: unknown = JSON.parse(input)
        formatted = JSON.stringify(parsed, null, 2)
      }
      setOutput(formatted)
      toast.success('Code formatted!')
    } catch {
      toast.error('Invalid code format')
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
      link.download = `formatted.${extension}`
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

      <Button onClick={handleFormat} className="w-full">
        Format Code
      </Button>

      {output && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Formatted Code</label>
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
