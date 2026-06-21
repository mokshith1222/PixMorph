'use client'
import React, { useState, useRef } from 'react'
import { Download, Plus, Trash2 } from 'lucide-react'
import html2canvas from 'html2canvas'

export function ResumeMaker() {
  const [name, setName] = useState('John Doe')
  const [title, setTitle] = useState('Software Engineer')
  const [email, setEmail] = useState('john@example.com')
  const [phone, setPhone] = useState('(555) 123-4567')
  
  const [experience, setExperience] = useState([
      { company: 'Tech Corp', role: 'Senior Developer', years: '2020 - Present' }
  ])
  
  const previewRef = useRef<HTMLDivElement>(null)

  const download = async () => {
      if(!previewRef.current) return
      const canvas = await html2canvas(previewRef.current, { scale: 2 })
      const link = document.createElement('a')
      link.download = 'resume.png'
      link.href = canvas.toDataURL()
      link.click()
  }

  const addExp = () => setExperience([...experience, { company: 'New Company', role: 'Role', years: 'Year' }])
  const removeExp = (index: number) => setExperience(experience.filter((_, i) => i !== index))

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <div className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 shadow-sm max-h-[800px] overflow-y-auto">
          <h3 className="font-bold text-lg border-b pb-2">Personal Info</h3>
          <div className="grid grid-cols-2 gap-4">
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" placeholder="Name" />
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" placeholder="Title" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" placeholder="Email" />
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none" placeholder="Phone" />
          </div>
          
          <div className="flex justify-between items-center border-b pb-2 mt-6">
              <h3 className="font-bold text-lg">Experience</h3>
              <button onClick={addExp} className="p-2 bg-primary-100 text-primary-600 rounded-lg hover:bg-primary-200"><Plus className="w-4 h-4"/></button>
          </div>
          <div className="space-y-4">
              {experience.map((exp, i) => (
                  <div key={i} className="flex gap-2 items-center bg-gray-50 dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex-1 space-y-2">
                          <input type="text" value={exp.company} onChange={e => { const newE = [...experience]; newE[i].company = e.target.value; setExperience(newE) }} className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-sm" />
                          <input type="text" value={exp.role} onChange={e => { const newE = [...experience]; newE[i].role = e.target.value; setExperience(newE) }} className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-sm" />
                          <input type="text" value={exp.years} onChange={e => { const newE = [...experience]; newE[i].years = e.target.value; setExperience(newE) }} className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-sm" />
                      </div>
                      <button onClick={() => removeExp(i)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                  </div>
              ))}
          </div>

          <button onClick={download} className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors mt-8">
              <Download className="w-5 h-5" /> Download PDF/Image
          </button>
      </div>
      
      <div className="bg-gray-200 dark:bg-gray-900 rounded-3xl flex items-center justify-center p-8 overflow-auto border border-gray-300 dark:border-gray-800">
          <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white shadow-2xl shrink-0 p-12 text-gray-900" ref={previewRef}>
              <div className="border-b-4 border-gray-900 pb-8 mb-8">
                  <h2 className="text-5xl font-bold mb-2 uppercase tracking-wide text-gray-900">{name}</h2>
                  <h2 className="text-2xl text-primary-600 font-medium mb-4">{title}</h2>
                  <div className="flex gap-6 text-sm text-gray-600 font-medium">
                      <span>{email}</span>
                      <span>{phone}</span>
                  </div>
              </div>
              
              <div>
                  <h3 className="text-xl font-bold uppercase tracking-widest text-gray-900 border-b-2 border-gray-200 pb-2 mb-6">Experience</h3>
                  <div className="space-y-6">
                      {experience.map((exp, i) => (
                          <div key={i}>
                              <div className="flex justify-between items-baseline mb-1">
                                  <h4 className="text-lg font-bold text-gray-900">{exp.role}</h4>
                                  <span className="text-sm font-bold text-primary-600">{exp.years}</span>
                              </div>
                              <div className="text-gray-600 font-medium mb-2">{exp.company}</div>
                              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                                  <li>Developed and maintained core features.</li>
                                  <li>Collaborated with cross-functional teams.</li>
                              </ul>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}
