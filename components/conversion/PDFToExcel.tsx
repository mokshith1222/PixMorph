'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { extractTextFromPdf } from '@/lib/pdf-utils'

export function PDFToExcel() {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleConvert = async () => {
    if (files.length === 0) return
    setConverting(true)
    setProgress(0)
    setConvertedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const text = await extractTextFromPdf(files[i])
        const csv = text.split('\n').map((line) => `"${line.replace(/"/g, '""')}"`).join('\n')
        const blob = new Blob([csv as any], { type: 'text/csv' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '.csv'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setConvertedFiles(results)
      toast.success(`Converted ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to convert PDF to Excel.')
    } finally {
      setConverting(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f.filter((x) => x.name.endsWith('.pdf'))])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={converting} />}
      {converting && <ProgressBar progress={progress} />}
      {convertedFiles.map((f, i) => (
        <a key={i} href={f.url} download={f.name} className="flex items-center gap-2 text-primary-500"><Download className="w-4 h-4" />{f.name}</a>
      ))}
      <Button onClick={handleConvert} disabled={files.length === 0 || converting} className="w-full">
        {converting ? 'Converting...' : 'Convert PDF to Excel'}
      </Button>
    </div>
  )
}
