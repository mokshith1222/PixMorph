import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PdfToTxt } from '@/components/conversion/PdfToTxt'

export const metadata: Metadata = {
  title: 'PDF to TXT - Free Online Tool | PixMorph',
  description: 'Convert PDF to Text. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-txt' }
}

export default function PdfToTxtPage() {
  return (
    <ToolLayout
      title="PDF to TXT"
      description="Convert PDF to Text"
      icon={<FileText className="w-6 h-6" />}
    >
      <PdfToTxt />
    </ToolLayout>
  )
}
