'use client'
import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function Md5Generator() {
  const [text, setText] = useState('')
  
  const hash = text ? CryptoJS.MD5(text).toString() : ''

  const handleCopy = () => {
    if(!hash) return
    navigator.clipboard.writeText(hash)
    toast.success('MD5 Hash copied')
  }

  return (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 shadow-sm transition-shadow"
          placeholder="Enter text to hash..."
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">MD5 Hash Output</label>
        <div className="relative group">
          <input
            readOnly
            value={hash}
            className="w-full p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl font-mono text-gray-800 dark:text-gray-200 outline-none shadow-inner text-lg"
            placeholder="Hash will appear here"
          />
          <button onClick={handleCopy} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all text-primary-500 shadow-sm opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
