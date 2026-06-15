'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function UrlDecoder() {
  const [text, setText] = useState('')
  
  let decoded = ''
  try {
    decoded = decodeURIComponent(text)
  } catch (e) {
    decoded = 'Invalid URL Encoded string'
  }

  const handleCopy = () => {
    if(!decoded || decoded === 'Invalid URL Encoded string') return
    navigator.clipboard.writeText(decoded)
    toast.success('Decoded URL copied')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Encoded URL</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[400px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm transition-shadow"
          placeholder="https%3A%20%2F%2Fexample.com%2F%3Fq%3Dhello%20world"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Decoded Output</label>
        <textarea
          readOnly
          value={decoded}
          className={`w-full flex-grow h-[400px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner transition-colors ${decoded === 'Invalid URL Encoded string' ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
          placeholder="https://example.com/?q=hello world"
        />
        <div className="absolute top-12 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleCopy} className="p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm border border-gray-200 dark:border-gray-700" title="Copy">
            <Copy className="w-5 h-5 text-primary-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
