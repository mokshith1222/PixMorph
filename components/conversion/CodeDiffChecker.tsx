'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { GitCompare, Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function CodeDiffChecker() {
  const [code1, setCode1] = useState('')
  const [code2, setCode2] = useState('')
  const [diff, setDiff] = useState('')

  const handleCompare = () => {
    if (!code1 || !code2) {
      toast.error('Please enter both code snippets')
      return
    }

    try {
      const lines1 = code1.split('\n')
      const lines2 = code2.split('\n')
      let diffResult = ''

      const maxLines = Math.max(lines1.length, lines2.length)
      for (let i = 0; i < maxLines; i++) {
        const line1 = lines1[i] ?? ''
        const line2 = lines2[i] ?? ''
        if (line1 === line2) {
          diffResult += `  ${line1}\n`
        } else if (line1 && !line2) {
          diffResult += `- ${line1}\n`
        } else if (!line1 && line2) {
          diffResult += `+ ${line2}\n`
        } else {
          diffResult += `- ${line1}\n+ ${line2}\n`
        }
      }

      setDiff(diffResult)
      toast.success('Diff generated!')
    } catch {
      toast.error('Failed to generate diff')
    }
  }

  const handleCopy = () => {
    if (diff) {
      void navigator.clipboard.writeText(diff)
      toast.success('Copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Code 1</label>
        <Textarea
          value={code1}
          onChange={(e) => setCode1(e.target.value)}
          placeholder="Paste first code here..."
          className="min-h-[100px] font-mono"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Code 2</label>
        <Textarea
          value={code2}
          onChange={(e) => setCode2(e.target.value)}
          placeholder="Paste second code here..."
          className="min-h-[100px] font-mono"
        />
      </div>

      <Button onClick={handleCompare} className="w-full">
        <GitCompare className="w-4 h-4 mr-2" />
        Compare Code
      </Button>

      {diff && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Diff Output</label>
            <Button onClick={handleCopy} variant="ghost" size="sm">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea value={diff} readOnly className="min-h-[150px] font-mono bg-gray-50 dark:bg-gray-800" />
        </div>
      )}
    </div>
  )
}
