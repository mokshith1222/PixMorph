import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { PDFCompressor } from '@/components/conversion/PDFCompressor'

export const metadata: Metadata = {
  title: 'PDF Compressor - Free Online Tool | PixMorph',
  description: 'Compress PDF files online for free. Reduce PDF file size while maintaining document quality. Fast, free, and secure browser-based tool. Your files never...',
  alternates: { canonical: '/pdf-compressor' }
}

export default function PdfCompressorPage() {
  return (
    <ToolLayout title="PDF Compressor" description="Compress PDF files" icon={<Zap className="w-6 h-6" />}>
      <PDFCompressor />
    </ToolLayout>
  )
}