'use client'
import React, { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'

export function CharacterCounter() {
  const [text, setText] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    toast.success('Text copied to clipboard')
  }

  const clear = () => setText('')

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Characters', value: text.length },
          { label: 'Words', value: text.trim() ? text.trim().split(/\s+/).length : 0 },
          { label: 'Lines', value: text ? text.split('\n').length : 0 },
          { label: 'Bytes', value: new Blob([text]).size }
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-500">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-64 p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-inner transition-shadow"
          placeholder="Type or paste your text here..."
        />
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors text-gray-700 dark:text-gray-300 shadow-sm" title="Copy text">
            <Copy className="w-4 h-4" />
          </button>
          <button onClick={clear} className="p-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl transition-colors text-red-600 dark:text-red-400 shadow-sm" title="Clear text">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
