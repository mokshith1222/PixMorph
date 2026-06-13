'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import { PDFDocument, degrees, rgb } from 'pdf-lib'
import { toBlobPart } from '@/lib/utils'
import toast from 'react-hot-toast'

export function PDFWatermarker() {
  const [files, setFiles] = useState<File[]>([])
  const [watermarkText, setWatermarkText] = useState('')
  const [watermarking, setWatermarking] = useState(false)
  const [watermarkedFiles, setWatermarkedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleWatermark = async () => {
    if (files.length === 0 || !watermarkText) {
      toast.error('Please select files and enter watermark text')
      return
    }
    setWatermarking(true)
    setWatermarkedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        pdfDoc.getPages().forEach((page) => {
          const { width, height } = page.getSize()
          page.drawText(watermarkText, {
            x: width / 4,
            y: height / 2,
            size: 40,
            color: rgb(0.7, 0.7, 0.7),
            rotate: degrees(45),
            opacity: 0.3,
          })
        })
        const bytes = await pdfDoc.save()
        const blob = new Blob([toBlobPart(bytes)], { type: 'application/pdf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '-watermarked.pdf'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setWatermarkedFiles(results)
      toast.success(`Watermarked ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to watermark PDF.')
    } finally {
      setWatermarking(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={watermarking} />}
      <Input value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="Enter watermark text" />
      {watermarking && <ProgressBar progress={progress} />}
      {watermarkedFiles.map((f, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm">{f.name}</span>
          <a href={f.url} download={f.name}><Download className="w-4 h-4" /></a>
        </div>
      ))}
      <Button onClick={handleWatermark} disabled={files.length === 0 || !watermarkText || watermarking} className="w-full">{watermarking ? 'Watermarking...' : 'Add Watermark'}</Button>
    </div>
  )
}
