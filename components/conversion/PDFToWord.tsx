'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import toast from 'react-hot-toast'
import { extractTextFromPdf, textToRtf } from '@/lib/pdf-utils'

export function PDFToWord() {
  const [files, setFiles] = useState<File[]>([])
  const [converting, setConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleFiles = (newFiles: File[]) => {
    const pdfFiles = newFiles.filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    )
    if (pdfFiles.length === 0) {
      toast.error('Please select PDF files only')
      return
    }
    setFiles((prev) => [...prev, ...pdfFiles])
  }

  const handleConvert = async () => {
    if (files.length === 0) return
    setConverting(true)
    setProgress(0)
    setConvertedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const text = await extractTextFromPdf(files[i])
        if (!text.trim()) {
          toast.error(`${files[i].name}: No text found (scanned PDFs need OCR).`)
          continue
        }
        const rtf = textToRtf(text)
        const blob = new Blob([rtf], { type: 'application/rtf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '.rtf'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      if (results.length === 0) {
        toast.error('No text could be extracted from the PDF(s).')
      } else {
        setConvertedFiles(results)
        toast.success(`Converted ${results.length} file(s)! Open in Word or LibreOffice.`)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF. Ensure the file is not password-protected.')
    } finally {
      setConverting(false)
    }
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Extracts text from PDF and saves as RTF (opens in Microsoft Word). Scanned/image-only PDFs won&apos;t work without OCR.
      </p>
      <DropZone onFilesDrop={handleFiles} accept=".pdf,application/pdf" multiple />
      {files.length > 0 && (
        <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={converting} />
      )}
      {converting && <ProgressBar progress={progress} />}
      {convertedFiles.length > 0 && (
        <div className="space-y-2">
          {convertedFiles.map((f, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-sm">{f.name}</span>
              <a href={f.url} download={f.name} className="text-primary-500 hover:text-primary-600">
                <Download className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      )}
      <Button onClick={handleConvert} disabled={files.length === 0 || converting} className="w-full">
        {converting ? 'Converting...' : 'Convert PDF to Word (RTF)'}
      </Button>
    </div>
  )
}
