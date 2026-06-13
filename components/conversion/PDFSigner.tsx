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

export function PDFSigner() {
  const [files, setFiles] = useState<File[]>([])
  const [signatureFile, setSignatureFile] = useState<File | null>(null)
  const [signing, setSigning] = useState(false)
  const [signedFiles, setSignedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleSign = async () => {
    if (files.length === 0 || !signatureFile) {
      toast.error('Please upload PDFs and a signature image')
      return
    }
    setSigning(true)
    setSignedFiles([])
    try {
      const sigBytes = await signatureFile.arrayBuffer()
      const results = []
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        const isPng = signatureFile.type === 'image/png'
        const image = isPng
          ? await pdfDoc.embedPng(sigBytes)
          : await pdfDoc.embedJpg(sigBytes)
        pdfDoc.getPages().forEach((page) => {
          const { width } = page.getSize()
          page.drawImage(image, { x: width - 160, y: 50, width: 120, height: 60 })
        })
        const bytes = await pdfDoc.save()
        const blob = new Blob([toBlobPart(bytes)], { type: 'application/pdf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '-signed.pdf'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setSignedFiles(results)
      toast.success(`Signed ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to sign PDF. Use PNG or JPG signature.')
    } finally {
      setSigning(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={signing} />}
      <div>
        <label className="text-sm font-medium mb-2 block">Signature Image</label>
        <DropZone onFilesDrop={(f) => f[0] && setSignatureFile(f[0])} accept="image/*" multiple={false} />
        {signatureFile && <p className="text-sm mt-2">{signatureFile.name}</p>}
      </div>
      {signing && <ProgressBar progress={progress} />}
      {signedFiles.map((f, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm">{f.name}</span>
          <a href={f.url} download={f.name}><Download className="w-4 h-4" /></a>
        </div>
      ))}
      <Button onClick={handleSign} disabled={files.length === 0 || !signatureFile || signing} className="w-full">{signing ? 'Signing...' : 'Sign PDF'}</Button>
    </div>
  )
}
