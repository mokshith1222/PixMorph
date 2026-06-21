import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PdfToDocx } from '@/components/conversion/PdfToDocx'

export const metadata: Metadata = {
  title: 'PDF to DOCX - Free Online Tool | PixMorph',
  description: 'Convert PDF to Word DOCX. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-docx' }
}

export default function PdfToDocxPage() {
  return (
    <ToolLayout
      title="PDF to DOCX"
      description="Convert PDF to Word DOCX"
      icon={<FileText className="w-6 h-6" />}
    >
      <PdfToDocx />
    </ToolLayout>
  )
}
