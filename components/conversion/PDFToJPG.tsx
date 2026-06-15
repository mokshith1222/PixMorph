'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download, FileImage } from 'lucide-react'
import JSZip from 'jszip'
import toast from 'react-hot-toast'
import { getPdfPageCount, renderPdfPageToJpeg } from '@/lib/pdf-utils'

export function PDFToJPG() {
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
      const results: { name: string; url: string; size: number }[] = []
      let totalPages = 0
      for (const file of files) totalPages += await getPdfPageCount(file)
      let currentPage = 0
      for (const file of files) {
        const pageCount = await getPdfPageCount(file)
        for (let i = 1; i <= pageCount; i++) {
          const blob = await renderPdfPageToJpeg(file, i)
          results.push({
            name: `${file.name.replace(/\.pdf$/i, '')}_page_${i}.jpg`,
            url: URL.createObjectURL(blob),
            size: blob.size,
          })
          currentPage++
          setProgress((currentPage / totalPages) * 100)
        }
      }
      setConvertedFiles(results)
      toast.success(`Converted ${results.length} page(s)!`)
    } catch (error) {
      console.error(error)
      toast.error('Failed to convert PDF. Ensure the file is not password-protected.')
    } finally {
      setConverting(false)
    }
  }

  const handleDownloadAll = async () => {
    const zip = new JSZip()
    for (const file of convertedFiles) {
      zip.file(file.name, await (await fetch(file.url)).blob())
    }
    const url = URL.createObjectURL(await zip.generateAsync({ type: 'blob' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'pdf-pages.zip'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={handleFiles} accept=".pdf,application/pdf" multiple />
      {files.length > 0 && (
        <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={converting} />
      )}
      {converting && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Converting...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      )}
      {convertedFiles.length > 0 && !converting && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {convertedFiles.map((f, i) => (
              <a key={i} href={f.url} download={f.name} className="block rounded border overflow-hidden hover:ring-2 ring-primary-500">
                <img src={f.url} alt={f.name} className="w-full h-auto" />
              </a>
            ))}
          </div>
          <Button onClick={handleDownloadAll} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />Download All as ZIP
          </Button>
        </>
      )}
      <Button 
        onClick={() => {
          if (files.length === 0) {
            toast.error('No files found! Please upload a PDF first.');
            return;
          }
          handleConvert();
        }} 
        disabled={converting} 
        className="w-full"
      >
        <FileImage className="w-4 h-4 mr-2" />
        {converting ? 'Converting...' : 'Convert PDF to JPG'}
      </Button>
    </div>
  )
}
