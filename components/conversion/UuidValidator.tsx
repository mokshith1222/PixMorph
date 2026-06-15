'use client'
import React, { useState } from 'react'
import { validate, version } from 'uuid'
import { CheckCircle, XCircle, Fingerprint } from 'lucide-react'

export function UuidValidator() {
  const [text, setText] = useState('')
  
  let isValid = false;
  let ver = 0;
  
  if (text.trim() !== '') {
      isValid = validate(text.trim())
      if (isValid) {
          ver = version(text.trim())
      }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-10">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Fingerprint className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">UUID Validator</h2>
        <p className="text-gray-500 dark:text-gray-400">Instantly verify Universally Unique Identifiers.</p>
      </div>

      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-6 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-3xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-gray-800 dark:text-gray-200 font-mono text-center text-xl shadow-lg transition-all"
          placeholder="123e4567-e89b-12d3-a456-426614174000"
        />
      </div>
      
      {text.trim() !== '' && (
          <div className={`p-8 rounded-3xl flex flex-col items-center justify-center gap-4 border-2 text-center animate-scale-in ${isValid ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800/50 text-green-800 dark:text-green-300 shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)]' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300 shadow-[0_0_60px_-15px_rgba(239,68,68,0.3)]'}`}>
              {isValid ? <CheckCircle className="w-20 h-20 text-green-500 animate-pulse" /> : <XCircle className="w-20 h-20 text-red-500" />}
              <div>
                  <h3 className="text-3xl font-bold mb-2">{isValid ? 'Valid UUID Structure' : 'Invalid UUID'}</h3>
                  {isValid && <p className="opacity-80 text-lg">Detected UUID Version {ver}</p>}
              </div>
          </div>
      )}
    </div>
  )
}
