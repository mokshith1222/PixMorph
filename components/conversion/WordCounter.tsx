'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/Textarea'

export function WordCounter() {
  const [text, setText] = useState('')

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const charCountNoSpaces = text.replace(/\s/g, '').length
  const sentenceCount = text ? text.split(/[.!?]+/).length - 1 : 0

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="min-h-[200px]"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <div className="text-2xl font-bold">{wordCount}</div>
          <div className="text-sm text-gray-500">Words</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <div className="text-2xl font-bold">{charCount}</div>
          <div className="text-sm text-gray-500">Characters</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <div className="text-2xl font-bold">{charCountNoSpaces}</div>
          <div className="text-sm text-gray-500">No Spaces</div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          <div className="text-2xl font-bold">{sentenceCount}</div>
          <div className="text-sm text-gray-500">Sentences</div>
        </div>
      </div>
    </div>
  )
}
