'use client'
import React, { useState, useMemo } from 'react'
import CryptoJS from 'crypto-js'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function ShaGenerator() {
  const [text, setText] = useState('')
  const [variant, setVariant] = useState('SHA256')
  
  const hash = useMemo(() => {
    if (!text) return ''
    switch(variant) {
      case 'SHA1': return CryptoJS.SHA1(text).toString()
      case 'SHA224': return CryptoJS.SHA224(text).toString()
      case 'SHA256': return CryptoJS.SHA256(text).toString()
      case 'SHA384': return CryptoJS.SHA384(text).toString()
      case 'SHA512': return CryptoJS.SHA512(text).toString()
      case 'SHA3': return CryptoJS.SHA3(text).toString()
      default: return ''
    }
  }, [text, variant])

  const handleCopy = () => {
    if(!hash) return
    navigator.clipboard.writeText(hash)
    toast.success(`${variant} Hash copied`)
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Input Text</label>
          <select value={variant} onChange={(e) => setVariant(e.target.value)} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-bold outline-none px-4 py-2 text-primary-600 dark:text-primary-400 shadow-sm cursor-pointer hover:border-primary-500 transition-colors">
            {['SHA1', 'SHA224', 'SHA256', 'SHA384', 'SHA512', 'SHA3'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-40 p-5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 shadow-sm transition-shadow"
          placeholder="Enter text to hash..."
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">{variant} Hash Output</label>
        <div className="relative group">
          <textarea
            readOnly
            value={hash}
            className="w-full h-32 p-5 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none break-all shadow-inner text-lg"
            placeholder="Hash will appear here"
          />
          <button onClick={handleCopy} className="absolute right-3 top-3 p-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all text-primary-500 shadow-sm opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
            <Copy className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
