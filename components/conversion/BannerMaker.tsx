'use client'
import React, { useState, useRef } from 'react'
import { Download, Type, PaintBucket, Image as ImageIcon } from 'lucide-react'
import html2canvas from 'html2canvas'

export function BannerMaker() {
  const [title, setTitle] = useState('Amazing Banner Title')
  const [subtitle, setSubtitle] = useState('This is a subtitle for the banner')
  const [bgColor1, setBgColor1] = useState('#8b5cf6')
  const [bgColor2, setBgColor2] = useState('#3b82f6')
  
  const previewRef = useRef<HTMLDivElement>(null)

  const download = async () => {
      if(!previewRef.current) return
      const canvas = await html2canvas(previewRef.current, { scale: 2 })
      const link = document.createElement('a')
      link.download = 'banner.png'
      link.href = canvas.toDataURL()
      link.click()
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Title</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />
          </div>
          <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
              <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Gradient Start</label>
              <input type="color" value={bgColor1} onChange={e => setBgColor1(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer" />
          </div>
          <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Gradient End</label>
              <input type="color" value={bgColor2} onChange={e => setBgColor2(e.target.value)} className="w-full h-12 rounded-xl cursor-pointer" />
          </div>
          <div className="md:col-span-2 flex items-end">
              <button onClick={download} className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-5 h-5" /> Download Banner
              </button>
          </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
          <div style={{ width: 1200, height: 630 }} className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center border border-gray-200 dark:border-gray-800 mx-auto rounded-xl shadow-xl overflow-hidden shrink-0">
              <div ref={previewRef} className="w-full h-full flex flex-col items-center justify-center text-white p-20 text-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${bgColor1}, ${bgColor2})` }}>
                  {/* Decorative circles */}
                  <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
                  
                  <h1 className="text-7xl font-display font-bold mb-8 z-10">{title}</h1>
                  <p className="text-3xl opacity-90 z-10 max-w-4xl">{subtitle}</p>
              </div>
          </div>
      </div>
    </div>
  )
}
