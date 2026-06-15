'use client'
import React, { useState, useRef } from 'react'
import { Download, LayoutTemplate, Star, Type } from 'lucide-react'
import html2canvas from 'html2canvas'

export function IconMaker() {
  const [icon, setIcon] = useState('★')
  const [bgColor, setBgColor] = useState('#ec4899')
  const [iconColor, setIconColor] = useState('#ffffff')
  const [size, setSize] = useState(256)
  
  const previewRef = useRef<HTMLDivElement>(null)

  const download = async () => {
      if(!previewRef.current) return
      const canvas = await html2canvas(previewRef.current, { backgroundColor: null })
      const link = document.createElement('a')
      link.download = 'icon.png'
      link.href = canvas.toDataURL()
      link.click()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><Type className="w-4 h-4"/> Icon / Emoji</label>
              <input type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full p-3 text-2xl text-center bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" maxLength={2} />
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><LayoutTemplate className="w-4 h-4"/> Background</label>
              <div className="flex gap-2">
                  <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer" />
                  <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none font-mono" />
              </div>
          </div>
          <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><Star className="w-4 h-4"/> Icon Color</label>
              <div className="flex gap-2">
                  <input type="color" value={iconColor} onChange={e => setIconColor(e.target.value)} className="w-12 h-12 rounded-xl cursor-pointer" />
                  <input type="text" value={iconColor} onChange={e => setIconColor(e.target.value)} className="flex-1 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none font-mono" />
              </div>
          </div>
          <button onClick={download} className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-5 h-5" /> Download {size}x{size}
          </button>
      </div>
      <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-3xl flex items-center justify-center p-10 min-h-[500px] border border-gray-200 dark:border-gray-800">
          <div ref={previewRef} className="rounded-3xl flex items-center justify-center shadow-xl transition-all duration-300" style={{ width: size, height: size, backgroundColor: bgColor, color: iconColor, fontSize: size * 0.6 }}>
              {icon}
          </div>
      </div>
    </div>
  )
}
