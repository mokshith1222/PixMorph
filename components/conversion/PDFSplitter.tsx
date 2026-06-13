'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import { toBlobPart } from '@/lib/utils'
import toast from 'react-hot-toast'

export function PDFSplitter() {
  const [files, setFiles] = useState<File[]>([])
  const [splitting, setSplitting] = useState(false)
  const [splitFiles, setSplitFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleSplit = async () => {
    if (files.length === 0) return
    setSplitting(true)
    setSplitFiles([])
    try {
      const results = []
      let totalPages = 0
      for (const file of files) {
        totalPages += (await PDFDocument.load(await file.arrayBuffer())).getPageCount()
      }
      let currentPage = 0
      for (const file of files) {
        const pdfDoc = await PDFDocument.load(await file.arrayBuffer())
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdfDoc, [i])
          newPdf.addPage(page)
          const bytes = await newPdf.save()
          const blob = new Blob([toBlobPart(bytes)], { type: 'application/pdf' })
          results.push({
            name: `${file.name.replace(/\.pdf$/i, '')}_page_${i + 1}.pdf`,
            url: URL.createObjectURL(blob),
            size: blob.size,
          })
          currentPage++
          setProgress((currentPage / totalPages) * 100)
        }
      }
      setSplitFiles(results)
      toast.success(`Split ${results.length} pages!`)
    } catch {
      toast.error('Failed to split PDF.')
    } finally {
      setSplitting(false)
    }
  }

  const handleDownloadAll = async () => {
    const zip = new JSZip()
    for (const file of splitFiles) zip.file(file.name, await (await fetch(file.url)).blob())
    const url = URL.createObjectURL(await zip.generateAsync({ type: 'blob' }))
    const link = document.createElement('a')
    link.href = url
    link.download = 'split-pages.zip'
    link.click()
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={splitting} />}
      {splitting && <ProgressBar progress={progress} />}
      {splitFiles.length > 0 && <Button onClick={handleDownloadAll} variant="secondary" size="sm"><Download className="w-4 h-4 mr-2" />Download All</Button>}
      <Button onClick={handleSplit} disabled={files.length === 0 || splitting} className="w-full">{splitting ? 'Splitting...' : 'Split PDF'}</Button>
    </div>
  )
}
