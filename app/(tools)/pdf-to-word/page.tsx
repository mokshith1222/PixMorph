import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PDFToWord } from '@/components/conversion/PDFToWord'

export const metadata: Metadata = {
  title: 'PDF to Word - Free Online Tool | PixMorph',
  description: 'Convert PDF to Word documents online for free. Edit PDF content in Microsoft Word format. Fast, free, and secure browser-based tool. Your files never leave...',
  alternates: { canonical: '/pdf-to-word' }
}

export default function PdfToWordPage() {
  return (
    <ToolLayout title="PDF to Word" description="Convert PDF to Word" icon={<FileText className="w-6 h-6" />}>
      <PDFToWord />
    </ToolLayout>
  )
}