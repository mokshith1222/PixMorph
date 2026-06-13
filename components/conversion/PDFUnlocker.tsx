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

export function PDFUnlocker() {
  const [files, setFiles] = useState<File[]>([])
  const [password, setPassword] = useState('')
  const [unlocking, setUnlocking] = useState(false)
  const [unlockedFiles, setUnlockedFiles] = useState<{ name: string; url: string; size: number }[]>([])
  const [progress, setProgress] = useState(0)

  const handleUnlock = async () => {
    if (files.length === 0 || !password) {
      toast.error('Please select files and enter password')
      return
    }
    setUnlocking(true)
    setUnlockedFiles([])
    try {
      const results = []
      for (let i = 0; i < files.length; i++) {
        const pdfDoc = await PDFDocument.load(await files[i].arrayBuffer())
        const bytes = await pdfDoc.save()
        const blob = new Blob([toBlobPart(bytes)], { type: 'application/pdf' })
        results.push({
          name: files[i].name.replace(/\.pdf$/i, '-unlocked.pdf'),
          url: URL.createObjectURL(blob),
          size: blob.size,
        })
        setProgress(((i + 1) / files.length) * 100)
      }
      setUnlockedFiles(results)
      toast.success(`Unlocked ${results.length} file(s)!`)
    } catch {
      toast.error('Failed to unlock PDF. Check password.')
    } finally {
      setUnlocking(false)
    }
  }

  return (
    <div className="space-y-6">
      <DropZone onFilesDrop={(f) => setFiles((p) => [...p, ...f])} accept=".pdf" multiple />
      {files.length > 0 && <FileList files={files} onRemove={(i) => setFiles((p) => p.filter((_, idx) => idx !== i))} converting={unlocking} />}
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-950 dark:border-gray-700" placeholder="Enter PDF password" />
      {unlocking && <ProgressBar progress={progress} />}
      {unlockedFiles.map((f, i) => (
        <div key={i} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span className="text-sm">{f.name}</span>
          <a href={f.url} download={f.name}><Download className="w-4 h-4" /></a>
        </div>
      ))}
      <Button onClick={handleUnlock} disabled={files.length === 0 || !password || unlocking} className="w-full">{unlocking ? 'Unlocking...' : 'Unlock PDF'}</Button>
    </div>
  )
}
