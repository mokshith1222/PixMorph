import os

base_dir = r"c:\Users\moksh\OneDrive\Desktop\empty_folder\pixmorph\components\conversion"

files = {
    "CharacterCounter.tsx": """'use client'
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
          { label: 'Words', value: text.trim() ? text.trim().split(/\\s+/).length : 0 },
          { label: 'Lines', value: text ? text.split('\\n').length : 0 },
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
""",
    "Md5Generator.tsx": """'use client'
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
""",
    "ShaGenerator.tsx": """'use client'
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
""",
    "HtmlEncoder.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function HtmlEncoder() {
  const [text, setText] = useState('')
  
  const encoded = text.replace(/[\\u00A0-\\u9999<>&]/g, function(i) {
    return '&#'+i.charCodeAt(0)+';';
  })

  const handleCopy = () => {
    if(!encoded) return
    navigator.clipboard.writeText(encoded)
    toast.success('Encoded HTML copied')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Input HTML/Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[500px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm transition-shadow"
          placeholder="<h1>Hello World!</h1>"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Encoded Output</label>
        <textarea
          readOnly
          value={encoded}
          className="w-full flex-grow h-[500px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
          placeholder="&#60;h1&#62;Hello World!&#60;/h1&#62;"
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
""",
    "HtmlDecoder.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function HtmlDecoder() {
  const [text, setText] = useState('')
  
  const decodeHtml = (html: string) => {
    if(typeof document === 'undefined') return ''
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }
  
  const decoded = decodeHtml(text)

  const handleCopy = () => {
    if(!decoded) return
    navigator.clipboard.writeText(decoded)
    toast.success('Decoded HTML copied')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Encoded HTML</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[500px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm transition-shadow"
          placeholder="&#60;h1&#62;Hello World!&#60;/h1&#62;"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Decoded Output</label>
        <textarea
          readOnly
          value={decoded}
          className="w-full flex-grow h-[500px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
          placeholder="<h1>Hello World!</h1>"
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
""",
    "UrlDecoder.tsx": """'use client'
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
""",
    "Base64Decoder.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function Base64Decoder() {
  const [text, setText] = useState('')
  
  let decoded = ''
  try {
    if(text) decoded = decodeURIComponent(escape(window.atob(text)))
  } catch (e) {
    decoded = 'Invalid Base64 string'
  }

  const handleCopy = () => {
    if(!decoded || decoded === 'Invalid Base64 string') return
    navigator.clipboard.writeText(decoded)
    toast.success('Decoded string copied')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Base64 Encoded Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[400px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono break-all shadow-sm transition-shadow"
          placeholder="SGVsbG8gV29ybGQ="
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Decoded Output</label>
        <textarea
          readOnly
          value={decoded}
          className={`w-full flex-grow h-[400px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner transition-colors ${decoded === 'Invalid Base64 string' ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
          placeholder="Hello World"
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
""",
    "JsonValidator.tsx": """'use client'
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
        placeholder='{\\n  "key": "value"\\n}'
      />
    </div>
  )
}
""",
    "JsonMinifier.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function JsonMinifier() {
  const [text, setText] = useState('')
  
  let minified = ''
  let isError = false
  if (text.trim()) {
    try {
      minified = JSON.stringify(JSON.parse(text))
    } catch (e) {
      minified = 'Invalid JSON'
      isError = true
    }
  }

  const handleCopy = () => {
    if(!minified || isError) return
    navigator.clipboard.writeText(minified)
    toast.success('Minified JSON copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Formatted JSON</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm"
          placeholder='{\\n  "name": "John",\\n  "age": 30\\n}'
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Minified Output</label>
        <textarea
          readOnly
          value={minified}
          className={`w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none break-all shadow-inner transition-colors ${isError ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
          placeholder='{"name":"John","age":30}'
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
""",
    "UuidValidator.tsx": """'use client'
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
""",
    "JsonToYaml.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import YAML from 'yaml'

export function JsonToYaml() {
  const [text, setText] = useState('')
  
  let converted = ''
  let isError = false
  if (text.trim()) {
    try {
      converted = YAML.stringify(JSON.parse(text))
    } catch (e) {
      converted = 'Invalid JSON format'
      isError = true
    }
  }

  const handleCopy = () => {
    if(!converted || isError) return
    navigator.clipboard.writeText(converted)
    toast.success('YAML copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">JSON Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm"
          placeholder='{\\n  "key": "value"\\n}'
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">YAML Output</label>
        <textarea
          readOnly
          value={converted}
          className={`w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner transition-colors ${isError ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
          placeholder="key: value"
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
""",
    "YamlToJson.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import YAML from 'yaml'

export function YamToJson() {
  const [text, setText] = useState('')
  
  let converted = ''
  let isError = false
  if (text.trim()) {
    try {
      converted = JSON.stringify(YAML.parse(text), null, 2)
    } catch (e) {
      converted = 'Invalid YAML format'
      isError = true
    }
  }

  const handleCopy = () => {
    if(!converted || isError) return
    navigator.clipboard.writeText(converted)
    toast.success('JSON copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">YAML Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono shadow-sm"
          placeholder="key: value"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">JSON Output</label>
        <textarea
          readOnly
          value={converted}
          className={`w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner transition-colors ${isError ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
          placeholder='{\\n  "key": "value"\\n}'
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
""",
    "CsvToHtml.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function CsvToHtml() {
  const [text, setText] = useState('')
  const [useHeader, setUseHeader] = useState(true)
  
  let htmlOutput = ''
  
  if (text.trim()) {
    const lines = text.trim().split('\\n').map(line => {
      // Simple CSV split considering quotes
      const row = []
      let curr = ''
      let inQuotes = false
      for(let i=0; i<line.length; i++){
          if(line[i] === '"' && line[i+1] === '"') { curr += '"'; i++; }
          else if(line[i] === '"') { inQuotes = !inQuotes; }
          else if(line[i] === ',' && !inQuotes) { row.push(curr); curr = ''; }
          else { curr += line[i]; }
      }
      row.push(curr)
      return row
    })
    
    let table = '<table class="table-auto border-collapse border border-gray-300 w-full text-sm">\\n'
    lines.forEach((row, i) => {
        if (i === 0 && useHeader) {
            table += '  <thead class="bg-gray-50">\\n    <tr>\\n'
            row.forEach(col => { table += `      <th class="border border-gray-300 px-4 py-2 font-semibold text-left">${col.trim()}</th>\\n` })
            table += '    </tr>\\n  </thead>\\n  <tbody>\\n'
        } else {
            table += '    <tr class="hover:bg-gray-50">\\n'
            row.forEach(col => { table += `      <td class="border border-gray-300 px-4 py-2">${col.trim()}</td>\\n` })
            table += '    </tr>\\n'
        }
    })
    table += '  </tbody>\\n</table>'
    if(!useHeader) {
        table = table.replace('  </tbody>\\n', '') // cleanup if no head
        table = table.replace('<tbody>\\n', '')
    }
    htmlOutput = table
  }

  const handleCopy = () => {
    if(!htmlOutput) return
    navigator.clipboard.writeText(htmlOutput)
    toast.success('HTML copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">CSV Input</label>
            <label className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 gap-2 cursor-pointer bg-white dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <input type="checkbox" checked={useHeader} onChange={e => setUseHeader(e.target.checked)} className="rounded text-primary-500 focus:ring-primary-500 w-4 h-4" />
                First row is header
            </label>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="Name,Age,City\\nJohn,30,New York\\nJane,25,London"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">HTML Table Output</label>
        <textarea
          readOnly
          value={htmlOutput}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
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
""",
    "HtmlToCsv.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function HtmlToCsv() {
  const [text, setText] = useState('')
  
  let csvOutput = ''
  
  if (text.trim()) {
    try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'text/html')
        const tables = doc.querySelectorAll('table')
        if (tables.length > 0) {
            const rows = tables[0].querySelectorAll('tr')
            const csvRows: string[] = []
            rows.forEach(row => {
                const cols = row.querySelectorAll('th, td')
                const csvCols: string[] = []
                cols.forEach(col => {
                    let cText = (col.textContent || '').trim()
                    if(cText.includes(',') || cText.includes('"') || cText.includes('\\n')) {
                        cText = `"${cText.replace(/"/g, '""')}"`
                    }
                    csvCols.push(cText)
                })
                csvRows.push(csvCols.join(','))
            })
            csvOutput = csvRows.join('\\n')
        } else {
            csvOutput = 'No HTML table found'
        }
    } catch(e) {
        csvOutput = 'Error parsing HTML'
    }
  }

  const handleCopy = () => {
    if(!csvOutput || csvOutput.includes('Error') || csvOutput.includes('No HTML')) return
    navigator.clipboard.writeText(csvOutput)
    toast.success('CSV copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">HTML Table Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="<table>...</table>"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">CSV Output (First table only)</label>
        <textarea
          readOnly
          value={csvOutput}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
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
""",
    "MarkdownToHtml.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import { marked } from 'marked'

export function MarkdownToHtml() {
  const [text, setText] = useState('')
  
  let htmlOutput = ''
  if(text) {
      try {
          htmlOutput = marked.parse(text, { async: false }) as string
      } catch(e) {}
  }

  const handleCopy = () => {
    if(!htmlOutput) return
    navigator.clipboard.writeText(htmlOutput)
    toast.success('HTML copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Markdown Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="# Heading\\n\\n**Bold** text and *italic*."
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">HTML Output</label>
        <textarea
          readOnly
          value={htmlOutput}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner"
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
""",
    "CssMinifier.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function CssMinifier() {
  const [text, setText] = useState('')
  
  const minifyCss = (css: string) => {
    return css
      .replace(/\\/\\*.*?\\*\\//gs, '') // remove comments
      .replace(/\\s+/g, ' ') // collapse whitespace
      .replace(/\\s*([\\{\\}\\:\\;\\,\\>\\+\\~\\!])\\s*/g, '$1') // remove space around separators
      .replace(/\\;\\}/g, '}') // remove trailing semicolon
      .trim();
  }
  
  const minified = text ? minifyCss(text) : ''

  const handleCopy = () => {
    if(!minified) return
    navigator.clipboard.writeText(minified)
    toast.success('Minified CSS copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">CSS Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="body {\\n  color: red;\\n}"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Minified CSS Output</label>
        <textarea
          readOnly
          value={minified}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none break-all shadow-inner"
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
""",
    "CssFormatter.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import jsb from 'js-beautify'

export function CssFormatter() {
  const [text, setText] = useState('')
  
  let formatted = ''
  if(text) {
      formatted = jsb.css(text, { indent_size: 2 })
  }

  const handleCopy = () => {
    if(!formatted) return
    navigator.clipboard.writeText(formatted)
    toast.success('Formatted CSS copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Minified / Messy CSS Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="body{color:red;margin:0}h1{font-size:2em}"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Formatted CSS Output</label>
        <textarea
          readOnly
          value={formatted}
          className="w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner break-all"
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
""",
    "JsFormatter.tsx": """'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'
import jsb from 'js-beautify'

export function JsFormatter() {
  const [text, setText] = useState('')
  
  let formatted = ''
  if(text) {
      try {
          formatted = jsb.js(text, { indent_size: 2, space_in_empty_paren: true })
      } catch(e) {
          formatted = 'Syntax Error'
      }
  }

  const handleCopy = () => {
    if(!formatted || formatted === 'Syntax Error') return
    navigator.clipboard.writeText(formatted)
    toast.success('Formatted JS copied')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Minified / Messy JS Input</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[600px] p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl focus:ring-2 focus:ring-primary-500 resize-none outline-none text-gray-800 dark:text-gray-200 font-mono text-sm shadow-sm"
          placeholder="function foo(a,b){return a+b}console.log(foo(1,2));"
        />
      </div>
      <div className="relative group flex flex-col">
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Formatted JS Output</label>
        <textarea
          readOnly
          value={formatted}
          className={`w-full flex-grow h-[600px] p-6 pr-16 bg-gray-50 dark:bg-gray-900 border rounded-3xl font-mono text-sm text-gray-800 dark:text-gray-200 outline-none resize-none shadow-inner break-all transition-colors ${formatted === 'Syntax Error' ? 'border-red-400 text-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700'}`}
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
""",
    "WebsiteAgeCheck.tsx": """'use client'
import React, { useState } from 'react'
import { Search, Loader2, Calendar } from 'lucide-react'

export function WebsiteAgeCheck() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const checkAge = async () => {
    if(!domain) return
    setLoading(true)
    setError('')
    setResult(null)
    
    // Clean domain
    let target = domain.replace(/^https?:\\/\\//i, '').split('/')[0]
    
    try {
      const res = await fetch(`https://networkcalc.com/api/dns/whois/${target}`)
      const data = await res.json()
      
      if(data.status === 'OK' && data.whois && data.whois.creation_date) {
        const creationDate = new Date(data.whois.creation_date)
        const ageMs = Date.now() - creationDate.getTime()
        const ageYears = (ageMs / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2)
        
        setResult({
            domain: target,
            created: creationDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
            expires: data.whois.expiration_date ? new Date(data.whois.expiration_date).toLocaleDateString() : 'Unknown',
            registrar: data.whois.registrar || 'Unknown',
            ageYears
        })
      } else {
        setError('Could not retrieve WHOIS data. The domain might not exist or the TLD is not supported.')
      }
    } catch(err) {
      setError('Failed to fetch data. Please check your network connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Domain Age Checker</h2>
          <p className="text-gray-500 dark:text-gray-400">Discover when any website was registered.</p>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && checkAge()}
          className="flex-1 p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-500 outline-none text-gray-800 dark:text-gray-200 text-lg shadow-sm"
          placeholder="example.com"
        />
        <button
          onClick={checkAge}
          disabled={loading || !domain}
          className="px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[120px] shadow-lg shadow-primary-500/20"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </button>
      </div>

      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-800 animate-fade-in text-center font-medium">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 p-10 shadow-xl shadow-gray-200/20 dark:shadow-none animate-slide-up">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-100 dark:border-gray-700/50">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
              <Calendar className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">{result.domain}</h3>
              <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold">{result.ageYears} years old</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Registered On</p>
                <p className="font-bold text-gray-900 dark:text-white text-xl">{result.created}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Expires On</p>
                <p className="font-bold text-gray-900 dark:text-white text-xl">{result.expires}</p>
            </div>
            <div className="sm:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Registrar</p>
                <p className="font-bold text-gray-900 dark:text-white text-xl">{result.registrar}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
""",
    "WebsiteDnsLookup.tsx": """'use client'
import React, { useState } from 'react'
import { Search, Loader2, Database } from 'lucide-react'

export function WebsiteDnsLookup() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<{type: string, data: string}[]>([])
  const [error, setError] = useState('')

  const lookup = async () => {
    if(!domain) return
    setLoading(true)
    setError('')
    setRecords([])
    
    let target = domain.replace(/^https?:\\/\\//i, '').split('/')[0]
    
    try {
      const res = await fetch(`https://networkcalc.com/api/dns/lookup/${target}`)
      const data = await res.json()
      
      if(data.status === 'OK' && data.records) {
        const arr: {type: string, data: string}[] = []
        Object.keys(data.records).forEach(type => {
            const items = data.records[type]
            if(Array.isArray(items)) {
                items.forEach(item => {
                    let val = ''
                    if (typeof item === 'string') val = item
                    else if (item.address) val = item.address
                    else if (item.exchange) val = `${item.priority} ${item.exchange}`
                    else if (item.target) val = item.target
                    else val = JSON.stringify(item)
                    
                    if(val) arr.push({ type, data: val })
                })
            }
        })
        setRecords(arr)
        if(arr.length === 0) setError('No common DNS records found for this domain.')
      } else {
        setError('Could not retrieve DNS data.')
      }
    } catch(err) {
      setError('Failed to fetch data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">DNS Records Lookup</h2>
          <p className="text-gray-500 dark:text-gray-400">Instantly query A, AAAA, MX, TXT, and NS records.</p>
      </div>

      <div className="flex gap-4">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && lookup()}
          className="flex-1 p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-500 outline-none text-gray-800 dark:text-gray-200 text-lg shadow-sm"
          placeholder="example.com"
        />
        <button
          onClick={lookup}
          disabled={loading || !domain}
          className="px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center min-w-[120px] shadow-lg shadow-primary-500/20"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Search className="w-6 h-6" />}
        </button>
      </div>

      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-800 animate-fade-in text-center font-medium">
          {error}
        </div>
      )}

      {records.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-xl shadow-gray-200/20 dark:shadow-none animate-slide-up">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-3">
                <Database className="w-6 h-6 text-primary-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">DNS Records for {domain.replace(/^https?:\\/\\//i, '').split('/')[0]}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 text-sm uppercase tracking-wider font-bold text-gray-500">
                        <tr>
                            <th className="px-8 py-5 w-32">Type</th>
                            <th className="px-8 py-5">Record Data</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                        {records.map((r, i) => (
                            <tr key={i} className="hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors">
                                <td className="px-8 py-5 font-bold text-primary-600 dark:text-primary-400 text-lg">{r.type}</td>
                                <td className="px-8 py-5 font-mono text-base break-all text-gray-800 dark:text-gray-200">{r.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  )
}
""",
    "LogoMaker.tsx": """'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Download, Square, Circle, Triangle, Palette } from 'lucide-react'

export function LogoMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('PixMorph')
  const [color, setColor] = useState('#8b5cf6')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [shape, setShape] = useState('circle')
  const [fontSize, setFontSize] = useState(60)

  useEffect(() => {
    draw()
  }, [text, color, bgColor, shape, fontSize])

  const draw = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    // clear
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const cx = canvas.width / 2
    const cy = canvas.height / 2 - 40 // offset for text

    // draw shape
    ctx.fillStyle = color
    ctx.beginPath()
    if(shape === 'circle') {
        ctx.arc(cx, cy, 120, 0, Math.PI * 2)
    } else if(shape === 'square') {
        ctx.rect(cx - 120, cy - 120, 240, 240)
        // Add rounding
        ctx.lineJoin = 'round'
        ctx.lineWidth = 40
        ctx.strokeStyle = color
        ctx.strokeRect(cx - 100, cy - 100, 200, 200)
    } else if(shape === 'triangle') {
        ctx.moveTo(cx, cy - 120)
        ctx.lineTo(cx + 140, cy + 120)
        ctx.lineTo(cx - 140, cy + 120)
        ctx.lineJoin = 'round'
        ctx.lineWidth = 30
        ctx.strokeStyle = color
        ctx.stroke()
    }
    ctx.fill()

    // Add gradient to shape (optional embellishment)
    const gradient = ctx.createLinearGradient(cx - 120, cy - 120, cx + 120, cy + 120)
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)')
    gradient.addColorStop(1, 'rgba(0,0,0,0.1)')
    ctx.fillStyle = gradient
    ctx.fill()

    // draw text
    const brightness = parseInt(bgColor.slice(1, 3), 16) * 0.299 + parseInt(bgColor.slice(3, 5), 16) * 0.587 + parseInt(bgColor.slice(5, 7), 16) * 0.114
    ctx.fillStyle = brightness > 128 ? '#111827' : '#ffffff'
    
    ctx.font = `900 ${fontSize}px "Inter", "Helvetica Neue", sans-serif`
    ctx.textAlign = 'center'
    ctx.fillText(text, cx, canvas.height - 50)
  }

  const download = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const link = document.createElement('a')
    link.download = 'logo.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-8">
      <div className="lg:col-span-1 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
            <Palette className="w-6 h-6 text-primary-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Design Tools</h3>
        </div>
        
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Brand Name</label>
                <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-semibold outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Brand Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-14 rounded-xl cursor-pointer border-0 p-0" />
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Background</label>
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-14 rounded-xl cursor-pointer border-0 p-0" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Logo Mark Shape</label>
                <div className="flex gap-3">
                    {['circle', 'square', 'triangle'].map(s => (
                        <button key={s} onClick={() => setShape(s)} className={`flex-1 p-4 rounded-xl border-2 flex justify-center transition-all ${shape === s ? 'bg-primary-50 border-primary-500 text-primary-600 scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300'}`}>
                            {s === 'circle' && <Circle className="w-6 h-6" />}
                            {s === 'square' && <Square className="w-6 h-6" />}
                            {s === 'triangle' && <Triangle className="w-6 h-6" />}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Font Size</label>
                <input type="range" min="30" max="100" value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))} className="w-full accent-primary-500" />
            </div>
        </div>

        <button onClick={download} className="w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-8 shadow-lg shadow-primary-500/25">
            <Download className="w-5 h-5" /> Export High-Res PNG
        </button>
      </div>
      
      <div className="lg:col-span-2 flex items-center justify-center bg-[url('https://transparenttextures.com/patterns/cubes.png')] bg-gray-100 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 p-12 min-h-[600px] shadow-inner relative overflow-hidden">
        <canvas 
            ref={canvasRef} 
            width={600} 
            height={600} 
            className="w-[450px] max-w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl bg-white"
        />
      </div>
    </div>
  )
}
""",
    "IconMaker.tsx": """'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Download } from 'lucide-react'

export function IconMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('PM')
  const [color, setColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#ec4899')
  const [radius, setRadius] = useState(120)

  useEffect(() => {
    draw()
  }, [text, color, bgColor, radius])

  const draw = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // draw rounded rect background
    ctx.fillStyle = bgColor
    ctx.beginPath()
    ctx.roundRect(0, 0, canvas.width, canvas.height, radius)
    ctx.fill()
    
    // Add inner shadow/gradient for premium feel
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)
    grad.addColorStop(0, 'rgba(255,255,255,0.2)')
    grad.addColorStop(1, 'rgba(0,0,0,0.1)')
    ctx.fillStyle = grad
    ctx.fill()

    // draw text
    ctx.fillStyle = color
    ctx.font = '900 240px "Inter", sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    // Add text shadow
    ctx.shadowColor = 'rgba(0,0,0,0.2)'
    ctx.shadowBlur = 10
    ctx.shadowOffsetY = 5
    ctx.fillText(text.substring(0, 2).toUpperCase(), canvas.width / 2, canvas.height / 2 + 15)
    ctx.shadowColor = 'transparent'
  }

  const download = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const link = document.createElement('a')
    link.download = 'app-icon.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-8">
      <div className="lg:col-span-1 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Icon Studio</h3>
        
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Letters (max 2)</label>
                <input type="text" maxLength={2} value={text} onChange={e => setText(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-xl outline-none" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Text Color</label>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-full h-14 rounded-xl cursor-pointer border-0 p-0" />
                </div>
                <div>
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Background</label>
                    <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full h-14 rounded-xl cursor-pointer border-0 p-0" />
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Border Radius</label>
                    <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{radius}px</span>
                </div>
                <input type="range" min="0" max="256" value={radius} onChange={e => setRadius(parseInt(e.target.value))} className="w-full accent-primary-500" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Square</span>
                    <span>Circle</span>
                </div>
            </div>
        </div>

        <button onClick={download} className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-8 shadow-lg shadow-pink-500/25">
            <Download className="w-5 h-5" /> Export 512x512
        </button>
      </div>
      
      <div className="lg:col-span-2 flex items-center justify-center bg-gray-100 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 p-12 min-h-[600px] shadow-inner bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
        <canvas 
            ref={canvasRef} 
            width={512} 
            height={512} 
            className="w-[300px] h-[300px] shadow-[0_30px_60px_rgba(0,0,0,0.15)] bg-transparent transition-all"
        />
      </div>
    </div>
  )
}
""",
    "BannerMaker.tsx": """'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Download, Layout } from 'lucide-react'

export function BannerMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [title, setTitle] = useState('PIXMORPH STUDIO')
  const [subtitle, setSubtitle] = useState('The Ultimate Local-First Web Swiss Army Knife.')
  const [color1, setColor1] = useState('#0ea5e9')
  const [color2, setColor2] = useState('#6366f1')

  useEffect(() => {
    draw()
  }, [title, subtitle, color1, color2])

  const draw = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, color1)
    gradient.addColorStop(1, color2)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add Abstract Geometry Pattern
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(canvas.width, 0)
    ctx.fill()
    
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.beginPath()
    ctx.arc(canvas.width * 0.8, canvas.height * 0.2, 300, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    for(let i=0; i<15; i++) {
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 80, 0, Math.PI*2)
        ctx.fill()
    }

    // Title
    ctx.fillStyle = '#ffffff'
    ctx.font = '900 90px "Inter", sans-serif'
    ctx.textAlign = 'center'
    ctx.shadowColor = 'rgba(0,0,0,0.3)'
    ctx.shadowBlur = 20
    ctx.shadowOffsetY = 10
    ctx.fillText(title.toUpperCase(), canvas.width / 2, canvas.height / 2 - 20)

    // Subtitle
    ctx.shadowColor = 'transparent'
    ctx.fillStyle = 'rgba(255,255,255,0.9)'
    ctx.font = '500 40px "Inter", sans-serif'
    ctx.fillText(subtitle, canvas.width / 2, canvas.height / 2 + 70)
  }

  const download = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const link = document.createElement('a')
    link.download = 'social-banner.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-4">
            <Layout className="w-8 h-8 text-primary-500" />
            <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Social Banner Creator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm items-end">
            <div className="lg:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Headline</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold outline-none" />
            </div>
            <div className="lg:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Subheadline</label>
                <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium outline-none" />
            </div>
            <div className="flex gap-4 lg:col-span-1">
                <div className="flex-1">
                    <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Gradient</label>
                    <div className="flex h-14 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                        <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-1/2 h-full cursor-pointer border-0 p-0" />
                        <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-1/2 h-full cursor-pointer border-0 p-0" />
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-inner flex flex-col items-center">
            <div className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] max-w-full">
                <canvas 
                    ref={canvasRef} 
                    width={1200} 
                    height={630} 
                    className="w-[800px] max-w-full h-auto bg-gray-100 block"
                />
            </div>
            <div className="flex items-center justify-between w-full max-w-[800px] mt-8">
                <p className="text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">1200 x 630 px (Twitter/FB/LinkedIn)</p>
                <button onClick={download} className="px-8 py-3 bg-gradient-to-r from-primary-600 to-cyan-600 hover:from-primary-700 hover:to-cyan-700 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-lg shadow-primary-500/25">
                    <Download className="w-5 h-5" /> Download HD
                </button>
            </div>
        </div>
    </div>
  )
}
""",
    "PosterMaker.tsx": """'use client'
import React, { useRef, useState, useEffect } from 'react'
import { Download } from 'lucide-react'

export function PosterMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [heading, setHeading] = useState('SYNTHWAVE')
  const [date, setDate] = useState('LIVE CONCERT • OCT 24')
  const [desc, setDesc] = useState('Experience the ultimate retro futuristic night with live performances, neon art installations, and outrun aesthetics.')
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    draw()
  }, [heading, date, desc, theme])

  const draw = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    // Background
    ctx.fillStyle = theme === 'dark' ? '#09090b' : '#fafafa'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Decorative Element (Cyberpunk Sun / Grid)
    if (theme === 'dark') {
        const grad = ctx.createLinearGradient(0, 200, 0, 800)
        grad.addColorStop(0, '#f43f5e') // rose-500
        grad.addColorStop(1, '#8b5cf6') // violet-500
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(canvas.width/2, 500, 300, 0, Math.PI * 2)
        ctx.fill()
        
        // Grid lines to cut sun
        ctx.fillStyle = '#09090b'
        for(let i=0; i<10; i++) {
            ctx.fillRect(canvas.width/2 - 350, 500 + (i*30), 700, 4 + (i*1.5))
        }
    } else {
        ctx.fillStyle = '#f1f5f9'
        ctx.beginPath()
        ctx.arc(canvas.width, 0, 600, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = '#e2e8f0'
        ctx.beginPath()
        ctx.arc(0, canvas.height, 400, 0, Math.PI * 2)
        ctx.fill()
    }

    const textColor = theme === 'dark' ? '#ffffff' : '#0f172a'
    const accentColor = theme === 'dark' ? '#22d3ee' : '#0ea5e9'

    // Text
    ctx.fillStyle = textColor
    ctx.font = '900 120px "Impact", sans-serif'
    ctx.textAlign = 'center'
    
    // Heading
    ctx.shadowColor = theme === 'dark' ? 'rgba(244,63,94,0.5)' : 'rgba(0,0,0,0.1)'
    ctx.shadowBlur = 20
    ctx.fillText(heading.toUpperCase(), canvas.width / 2, 250)
    ctx.shadowColor = 'transparent'

    // Date tag
    ctx.fillStyle = accentColor
    ctx.font = 'bold 50px "Inter", sans-serif'
    ctx.letterSpacing = '10px'
    ctx.fillText(date.toUpperCase(), canvas.width / 2, 950)

    // Desc
    ctx.fillStyle = theme === 'dark' ? '#9ca3af' : '#475569'
    ctx.font = '400 36px "Inter", sans-serif'
    ctx.letterSpacing = '0px'
    
    // Simple wrap text
    const words = desc.split(' ')
    let line = ''
    let y = 1050
    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' '
      let metrics = ctx.measureText(testLine)
      if (metrics.width > canvas.width - 200 && n > 0) {
        ctx.fillText(line, canvas.width / 2, y)
        line = words[n] + ' '
        y += 55
      } else {
        line = testLine
      }
    }
    ctx.fillText(line, canvas.width / 2, y)
    
    // Border
    ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
    ctx.lineWidth = 20
    ctx.strokeRect(40, 40, canvas.width-80, canvas.height-80)
  }

  const download = () => {
    const canvas = canvasRef.current
    if(!canvas) return
    const link = document.createElement('a')
    link.download = 'poster.png'
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto py-8">
      <div className="lg:col-span-1 space-y-8 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-4">Flyer Setup</h3>
        
        <div className="space-y-6 flex-grow">
            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Style Theme</label>
                <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl">
                    <button onClick={() => setTheme('dark')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${theme === 'dark' ? 'bg-white dark:bg-gray-800 shadow-sm text-primary-500' : 'text-gray-500'}`}>Synth Dark</button>
                    <button onClick={() => setTheme('light')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${theme === 'light' ? 'bg-white dark:bg-gray-800 shadow-sm text-primary-500' : 'text-gray-500'}`}>Minimal Light</button>
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Main Heading</label>
                <input type="text" value={heading} onChange={e => setHeading(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none font-bold" />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Subheading / Date</label>
                <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none font-semibold" />
            </div>

            <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-gray-700 dark:text-gray-300">Details</label>
                <textarea value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none h-32 resize-none" />
            </div>
        </div>

        <button onClick={download} className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mt-8 shadow-lg shadow-primary-500/25">
            <Download className="w-5 h-5" /> Download Poster
        </button>
      </div>
      
      <div className="lg:col-span-2 flex items-center justify-center bg-gray-100 dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-700 p-8 min-h-[700px] bg-[url('https://transparenttextures.com/patterns/cubes.png')] shadow-inner">
        <canvas 
            ref={canvasRef} 
            width={1080} 
            height={1350} 
            className="max-w-full max-h-[700px] w-auto h-auto shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-lg bg-white transition-all"
        />
      </div>
    </div>
  )
}
""",
    "ResumeMaker.tsx": """'use client'
import React, { useRef, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import html2canvas from 'html2canvas'
import toast from 'react-hot-toast'

export function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null)
  
  const [data, setData] = useState({
      name: 'Alex Developer',
      title: 'Full Stack Engineer',
      email: 'alex@example.com',
      phone: '+1 (555) 019-2837',
      summary: 'Passionate and results-driven software engineer with over 5 years of experience building scalable web applications. Strong focus on modern JavaScript ecosystems, React, and serverless architectures.',
      experience: 'Senior Frontend Engineer | Tech Innovators (2021-Present)\\n• Architected a new React/Next.js frontend serving 1M+ MAU.\\n• Reduced bundle size by 45% through aggressive code splitting.\\n\\nSoftware Developer | StartUp Inc (2018-2021)\\n• Developed robust APIs using Node.js and Express.\\n• Implemented automated CI/CD pipelines using GitHub Actions.',
      education: 'B.S. Computer Science\\nUniversity of Technology (2014-2018)\\nGraduated with Honors, GPA: 3.8',
      skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, PostgreSQL, AWS, Docker, Git'
  })

  const handleChange = (e: any) => {
      setData({ ...data, [e.target.name]: e.target.value })
  }

  const download = async () => {
    if(!resumeRef.current) return
    const id = toast.loading('Generating image...')
    try {
        const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true, logging: false })
        const link = document.createElement('a')
        link.download = 'Resume.png'
        link.href = canvas.toDataURL('image/png')
        link.click()
        toast.success('Resume downloaded successfully!', { id })
    } catch(err) {
        toast.error('Failed to generate resume.', { id })
    }
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-[1600px] mx-auto py-8">
      <div className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm h-[900px] flex flex-col">
        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-700 pb-4">
            <FileText className="w-6 h-6 text-primary-500" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Content Editor</h3>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-4 space-y-6 custom-scrollbar">
            <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Full Name</label><input name="name" value={data.name} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Job Title</label><input name="title" value={data.title} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Email</label><input name="email" value={data.email} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500" /></div>
                <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Phone</label><input name="phone" value={data.phone} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500" /></div>
            </div>

            <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Professional Summary</label><textarea name="summary" value={data.summary} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500 h-24 resize-none" /></div>
            
            <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Experience (Plain Text)</label><textarea name="experience" value={data.experience} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500 h-48 resize-none leading-relaxed" /></div>
            
            <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Education</label><textarea name="education" value={data.education} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500 h-28 resize-none" /></div>
            
            <div><label className="block text-xs font-bold uppercase tracking-wider mb-2 text-gray-500">Skills (Comma separated)</label><textarea name="skills" value={data.skills} onChange={handleChange} className="w-full p-3 border-2 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 outline-none focus:border-primary-500 h-20 resize-none" /></div>
        </div>

        <button onClick={download} className="w-full py-4 mt-6 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg">
            <Download className="w-5 h-5" /> Export Resume (PNG)
        </button>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-900/50 p-8 rounded-3xl flex justify-center items-start overflow-hidden border border-gray-200 dark:border-gray-700 h-[900px] shadow-inner bg-[url('https://transparenttextures.com/patterns/cubes.png')]">
        {/* Actual Resume Preview inside an A4 sized div */}
        <div className="transform-gpu origin-top" style={{ transform: 'scale(0.75)' }}>
            <div 
                ref={resumeRef}
                className="bg-white text-gray-900 p-12 shadow-2xl relative" 
                style={{ width: '210mm', minHeight: '297mm', fontFamily: '"Inter", sans-serif' }}
            >
                {/* Header Strip */}
                <div className="absolute top-0 left-0 w-full h-3 bg-gray-900"></div>

                <div className="flex justify-between items-end border-b-2 border-gray-200 pb-8 mb-8 mt-4">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-2">{data.name}</h1>
                        <p className="text-2xl text-gray-500 font-medium tracking-wide">{data.title}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500 space-y-1 font-medium">
                        <p>{data.email}</p>
                        <p>{data.phone}</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-12">
                    {/* Left Column */}
                    <div className="col-span-8 space-y-10">
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Profile</h2>
                            <p className="text-gray-700 leading-relaxed text-[15px]">{data.summary}</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Experience</h2>
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
                                {data.experience}
                            </div>
                        </section>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-4 space-y-10">
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.skills.split(',').map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-semibold">{skill.trim()}</span>
                                ))}
                            </div>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-black uppercase tracking-widest text-gray-900 mb-4 pb-2 border-b-2 border-gray-100">Education</h2>
                            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-[15px]">
                                {data.education}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
"""

for file_name, content in files.items():
    path = os.path.join(base_dir, file_name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

print("Successfully generated all 25 tool components!")
