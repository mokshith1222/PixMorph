'use client'
import React, { useState } from 'react'
import { CheckCircle, XCircle, FileJson } from 'lucide-react'

export function JsonValidator() {
  const [text, setText] = useState('')
  
  let isValid = false;
  let errorMsg = '';
  
  if (text.trim() === '') {
    isValid = true;
  } else {
    try {
      JSON.parse(text);
      isValid = true;
    } catch (e: any) {
      isValid = false;
      errorMsg = e.message;
    }
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl flex items-center gap-4 transition-all duration-300 ${text.trim() === '' ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500' : isValid ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50 shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50 shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]'}`}>
        {text.trim() === '' ? <FileJson className="w-8 h-8 opacity-50" /> : isValid ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
        <div className="flex-1">
            <h3 className="text-lg font-bold">
                {text.trim() === '' ? 'Waiting for JSON input...' : isValid ? 'Valid JSON' : 'Invalid JSON format'}
            </h3>
            {errorMsg && <p className="text-sm mt-1 opacity-90 font-mono">{errorMsg}</p>}
        </div>
      </div>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-[600px] p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-inner leading-relaxed"
        placeholder='{\n  "key": "value"\n}'
      />
    </div>
  )
}
