import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PdfToRtf } from '@/components/conversion/PdfToRtf'

export const metadata: Metadata = {
  title: 'PDF to RTF - Free Online Tool | PixMorph',
  description: 'Convert PDF to RTF. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-rtf' }
}

export default function PdfToRtfPage() {
  return (
    <ToolLayout
      title="PDF to RTF"
      description="Convert PDF to RTF"
      icon={<FileText className="w-6 h-6" />}
    >
      <PdfToRtf />
    </ToolLayout>
  )
}
