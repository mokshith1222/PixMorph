import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Lock } from 'lucide-react'
import { PDFUnlocker } from '@/components/conversion/PDFUnlocker'

export const metadata: Metadata = {
  title: 'PDF Unlocker - Free Online Tool | PixMorph',
  description: 'Remove PDF password protection online for free. Unlock password-protected PDF files. Fast, free, and secure browser-based tool. Your files never leave your...',
}

export default function PdfUnlockerPage() {
  return (
    <ToolLayout title="PDF Unlocker" description="Remove PDF password" icon={<Lock className="w-6 h-6" />}>
      <PDFUnlocker />
    </ToolLayout>
  )
}