'use client'
import React, { useState, useRef } from 'react'
import { Download, Type, PaintBucket, Layout } from 'lucide-react'
import html2canvas from 'html2canvas'

export function LogoMaker() {
  const [text, setText] = useState('MyLogo')
  const [bgColor, setBgColor] = useState('#4f46e5')
  const [textColor, setTextColor] = useState('#ffffff')
  const [font, setFont] = useState('font-display')
  const [shape, setShape] = useState('rounded-2xl')
  
  const previewRef = useRef<HTMLDivElement>(null)

  const download = async () => {
      if(!previewRef.current) return
      const canvas = await html2canvas(previewRef.current, { backgroundColor: null })
      const link = document.createElement('a')
      link.download = 'logo.png'
      link.href = canvas.toDataURL()
      link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><Type className="w-4 h-4"/> Logo Text</label>
              <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><PaintBucket className="w-4 h-4"/> Background Color</label>
              <div className="flex gap-2">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer" />
                  <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none font-mono" />
              </div>
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><PaintBucket className="w-4 h-4"/> Text Color</label>
              <div className="flex gap-2">
                  <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer" />
                  <input type="text" value={textColor} onChange={e => setTextColor(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none font-mono" />
              </div>
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><Layout className="w-4 h-4"/> Shape</label>
              <select value={shape} onChange={e => setShape(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none">
                  <option value="rounded-none">Square</option>
                  <option value="rounded-2xl">Rounded</option>
                  <option value="rounded-full">Circle</option>
              </select>
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><Type className="w-4 h-4"/> Font</label>
              <select value={font} onChange={e => setFont(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none">
                  <option value="font-sans">Sans</option>
                  <option value="font-serif">Serif</option>
                  <option value="font-mono">Mono</option>
                  <option value="font-display">Display</option>
              </select>
          </div>
          <button onClick={download} className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-5 h-5" /> Download Logo
          </button>
      </div>
      <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-3xl flex items-center justify-center p-10 min-h-[500px] border border-gray-200 dark:border-gray-800" style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          <div ref={previewRef} className={`w-64 h-64 flex items-center justify-center text-4xl font-bold ${font} ${shape} shadow-2xl transition-all duration-300`} style={{ backgroundColor: bgColor, color: textColor }}>
              {text}
          </div>
      </div>
    </div>
  )
}
