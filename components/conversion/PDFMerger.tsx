'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import { toBlobPart } from '@/lib/utils'
import toast from 'react-hot-toast'

export function PDFMerger() {
  const [files, setFiles] = useState<File[]>([])
  const [merging, setMerging] = useState(false)
  const [mergedUrl, setMergedUrl] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please select at least 2 PDF files')
      return
    }
    setMerging(true)
    setMergedUrl(null)
    try {
      const mergedPdf = await PDFDocument.create()
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
        setProgress(((i + 1) / files.length) * 100)
      }
      const bytes = await mergedPdf.save()
      setMergedUrl(URL.createObjectURL(new Blob([toBlobPart(bytes)], { type: 'application/pdf' })))
      toast.success(`Merged ${files.length} files!`)
    } catch {
      toast.error('Failed to merge PDF.')
    } finally {
      setMerging(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={merging} />}
      {merging && <ProgressBar progress={progress} />}
      {mergedUrl && (
        <Button variant="secondary" onClick={() => {
          const link = document.createElement('a')
          link.href = mergedUrl
          link.download = 'merged.pdf'
          link.click()
        }}><Download className="w-4 h-4 mr-2" />Download Merged PDF</Button>
      )}
      <Button onClick={handleMerge} disabled={files.length < 2 || merging} className="w-full">
        {merging ? 'Merging...' : 'Merge PDFs'}
      </Button>
    </div>
  )
}
