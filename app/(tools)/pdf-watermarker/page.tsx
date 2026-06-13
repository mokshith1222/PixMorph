import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Droplet } from 'lucide-react'
import { PDFWatermarker } from '@/components/conversion/PDFWatermarker'

export const metadata: Metadata = {
  title: 'PDF Watermarker - Free Online Tool | PixMorph',
  description: 'Add watermarks to PDF documents online for free. Protect your PDF files with custom watermarks.',
}

export default function PdfWatermarkerPage() {
  return (
    <ToolLayout title="PDF Watermarker" description="Add watermarks to PDF" icon={<Droplet className="w-6 h-6" />}>
      <PDFWatermarker />
    </ToolLayout>
  )
}