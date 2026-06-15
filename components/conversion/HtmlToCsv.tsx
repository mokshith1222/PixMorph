'use client'
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
                    if(cText.includes(',') || cText.includes('"') || cText.includes('\n')) {
                        cText = `"${cText.replace(/"/g, '""')}"`
                    }
                    csvCols.push(cText)
                })
                csvRows.push(csvCols.join(','))
            })
            csvOutput = csvRows.join('\n')
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
