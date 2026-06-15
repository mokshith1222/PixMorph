'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import beautify from 'js-beautify'

export function JsFormatter() {
  const [text, setText] = useState('')
  
  let formatted = ''
  if (text.trim()) {
      try {
          formatted = beautify.js(text, { indent_size: 2, space_in_empty_paren: true })
      } catch (e) {
          formatted = text
      }
  }

  const handleCopy = () => {
    if(!formatted) return
    navigator.clipboard.writeText(formatted)
    toast.success('Formatted JS copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Minified/Ugly JS</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm"
          placeholder="function foo(a,b){return a+b;}"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Formatted Output</label>
        <textarea
          readOnly
          value={formatted}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
          placeholder="function foo(a, b) {\n  return a + b;\n}"
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
