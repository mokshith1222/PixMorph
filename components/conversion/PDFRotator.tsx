'use client'

import { useState } from 'react'
import { DropZone } from '@/components/ui/DropZone'
import { FileList } from '@/components/ui/FileList'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Download } from 'lucide-react'
import { PDFDocument, degrees } from 'pdf-lib'
import { toBlobPart } from '@/lib/utils'
import toast from 'react-hot-toast'

export function PDFRotator() {
  const [files, setFiles] = useState<File[]>([])
  const [angle, setAngle] = useState(90)
  const [rotating, setRotating] = useState(false)
  const [rotatedFiles, setRotatedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleRotate = async () => {
    if (files.length === 0) return
    setRotating(true)
    setRotatedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        pdfDoc.getPages().forEach((page) => page.setRotation(degrees(angle)))
        const bytes = await pdfDoc.save()
        const blob = new Blob([toBlobPart(bytes)], { type: 'application/pdf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, `-rotated-${angle}deg.pdf`),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setRotatedFiles(results)
      toast.success(`Rotated ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to rotate PDF.')
    } finally {
      setRotating(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={rotating} />}
      <div className="flex gap-2">
        {[90, 180, 270].map((a) => (
          <Button key={a} onClick={() => setAngle(a)} variant={angle === a ? 'primary' : 'secondary'}>{a}°</Button>
        ))}
      </div>
      {rotating && <ProgressBar progress={progress} />}
      {rotatedFiles.map((f, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm">{f.name}</span>
          <a href={f.url} download={f.name}><Download className="w-4 h-4" /></a>
        </div>
      ))}
      <Button onClick={handleRotate} disabled={files.length === 0 || rotating} className="w-full">{rotating ? 'Rotating...' : 'Rotate PDF'}</Button>
    </div>
  )
}
