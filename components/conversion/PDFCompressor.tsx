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

export function PDFCompressor() {
  const [files, setFiles] = useState<File[]>([])
  const [compressing, setCompressing] = useState(false)
  const [compressedFiles, setCompressedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleCompress = async () => {
    if (files.length === 0) return
    setCompressing(true)
    setProgress(0)
    setCompressedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        const compressed = await pdfDoc.save({ useObjectStreams: true })
        const blob = new Blob([toBlobPart(compressed)], { type: 'application/pdf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '-compressed.pdf'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setCompressedFiles(results)
      toast.success(`Compressed ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to compress PDF.')
    } finally {
      setCompressing(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={compressing} />}
      {compressing && <ProgressBar progress={progress} />}
      {compressedFiles.map((f, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm">{f.name}</span>
          <a href={f.url} download={f.name}><Download className="w-4 h-4" /></a>
        </div>
      ))}
      <Button onClick={handleCompress} disabled={files.length === 0 || compressing} className="w-full">
        {compressing ? 'Compressing...' : 'Compress PDF'}
      </Button>
    </div>
  )
}
