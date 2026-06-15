'use client'
import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import toast from 'react-hot-toast'

export function CsvToHtml() {
  const [text, setText] = useState('')
  const [useHeader, setUseHeader] = useState(true)
  
  let htmlOutput = ''
  
  if (text.trim()) {
    const lines = text.trim().split('\n').map(line => {
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
    
    let table = '<table class="table-auto border-collapse border border-gray-300 w-full text-sm">\n'
    lines.forEach((row, i) => {
        if (i === 0 && useHeader) {
            table += '  <thead class="bg-gray-50">\n    <tr>\n'
            row.forEach(col => { table += `      <th class="border border-gray-300 px-4 py-2 font-semibold text-left">${col.trim()}</th>\n` })
            table += '    </tr>\n  </thead>\n  <tbody>\n'
        } else {
            table += '    <tr class="hover:bg-gray-50">\n'
            row.forEach(col => { table += `      <td class="border border-gray-300 px-4 py-2">${col.trim()}</td>\n` })
            table += '    </tr>\n'
        }
    })
    table += '  </tbody>\n</table>'
    if(!useHeader) {
        table = table.replace('  </tbody>\n', '') // cleanup if no head
        table = table.replace('<tbody>\n', '')
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
          placeholder="Name,Age,City\nJohn,30,New York\nJane,25,London"
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
