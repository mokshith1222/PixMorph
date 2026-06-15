import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { RotateCw } from 'lucide-react'
import { PDFRotator } from '@/components/conversion/PDFRotator'

export const metadata: Metadata = {
  title: 'PDF Rotator - Free Online Tool | PixMorph',
  description: 'Rotate PDF pages online for free. Change page orientation in your PDF documents. Fast, free, and secure browser-based tool. Your files never leave your device.',
}

export default function PdfRotatorPage() {
  return (
    <ToolLayout title="PDF Rotator" description="Rotate PDF pages" icon={<RotateCw className="w-6 h-6" />}>
      <PDFRotator />
    </ToolLayout>
  )
}