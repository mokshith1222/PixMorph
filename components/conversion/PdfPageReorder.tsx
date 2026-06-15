'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { Button } from '@/components/ui/Button'
import { Download, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { PDFDocument } from 'pdf-lib'

export function PdfPageReorder() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleFiles = (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0])
      setResult(null)
    }
  }

  const handleProcess = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setLoading(true)

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const newPdfDoc = await PDFDocument.create()
      const pageCount = pdfDoc.getPageCount()
      const indices = Array.from({length: pageCount}, (_, i) => i).reverse() // Reverse order as an example
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, indices)
      copiedPages.forEach((page) => newPdfDoc.addPage(page))
      const pdfBytes = await newPdfDoc.save()
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setResult(url)
      
      toast.success('PDF Page Reorder processed successfully!')
    } catch (error) {
      toast.error('Failed to process file')
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      const link = document.createElement('a')
      link.href = result
      link.download = `${file?.name.replace(/\.[^/.]+$/, '') || 'output'}_processed.pdf`
      link.click()
      toast.success('Download started!')
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Upload a file to use the PDF Page Reorder tool.
        </p>
      </div>

      <DropZone 
        onFilesDrop={handleFiles} 
        accept="*"
        multiple={false}
      />

      {file && (
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-sm">{file.name}</span>
          <Button variant="ghost" size="sm" onClick={() => setFile(null)}>
            Remove
          </Button>
        </div>
      )}

      <Button onClick={handleProcess} disabled={!file || loading} className="w-full">
        <RefreshCw className="w-4 h-4 mr-2" />
        {loading ? 'Processing...' : 'Process File'}
      </Button>

      {result && (
        <div className="space-y-3">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-800 dark:text-green-200 text-sm">
            Processing complete! Ready to download.
          </div>
          <Button onClick={handleDownload} variant="secondary" className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Result
          </Button>
        </div>
      )}
    </div>
  )
}
