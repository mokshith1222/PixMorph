'use client'
import React, { useState, useRef } from 'react'
import { Download, Type } from 'lucide-react'
import html2canvas from 'html2canvas'

export function PosterMaker() {
  const [title, setTitle] = useState('EVENT TITLE')
  const [date, setDate] = useState('OCT 24, 2026')
  const [details, setDetails] = useState('Join us for an amazing event at the grand hall.')
  const [theme, setTheme] = useState('dark')
  
  const previewRef = useRef<HTMLDivElement>(null)

  const download = async () => {
      if(!previewRef.current) return
      const canvas = await html2canvas(previewRef.current, { scale: 2 })
      const link = document.createElement('a')
      link.download = 'poster.png'
      link.href = canvas.toDataURL()
      link.click()
  }

  const themes: any = {
      dark: { bg: '#111827', text: '#ffffff', accent: '#3b82f6' },
      light: { bg: '#ffffff', text: '#111827', accent: '#ef4444' },
      neon: { bg: '#000000', text: '#22c55e', accent: '#ec4899' }
  }
  
  const currentTheme = themes[theme]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none uppercase font-bold" />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Date / Time</label>
              <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none uppercase" />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Details</label>
              <textarea value={details} onChange={e => setDetails(e.target.value)} className="w-full h-24 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none resize-none" />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Theme</label>
              <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none capitalize">
                  {Object.keys(themes).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
          </div>
          <button onClick={download} className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
              <Download className="w-5 h-5" /> Download Poster
          </button>
      </div>
      <div className="lg:col-span-2 bg-gray-100 dark:bg-gray-900 rounded-3xl flex items-center justify-center p-10 border border-gray-200 dark:border-gray-800">
          <div style={{ width: 400, height: 600 }} className="relative shadow-2xl shrink-0 overflow-hidden">
              <div ref={previewRef} className="w-full h-full flex flex-col p-10 justify-between relative" style={{ backgroundColor: currentTheme.bg, color: currentTheme.text }}>
                  {/* Design Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 opacity-20 rotate-45 transform translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: currentTheme.accent }}></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20 rounded-full transform -translate-x-1/2 translate-y-1/2" style={{ backgroundColor: currentTheme.accent }}></div>
                  
                  <div className="z-10 mt-10">
                      <h1 className="text-6xl font-display font-black uppercase leading-tight mb-4" style={{ color: currentTheme.accent }}>{title}</h1>
                      <div className="w-20 h-2 mb-6" style={{ backgroundColor: currentTheme.text }}></div>
                      <h2 className="text-2xl font-bold uppercase tracking-widest">{date}</h2>
                  </div>
                  <div className="z-10 mb-10">
                      <p className="text-lg opacity-90 leading-relaxed font-medium">{details}</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
