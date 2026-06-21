import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PdfToPpt } from '@/components/conversion/PdfToPpt'

export const metadata: Metadata = {
  title: 'PDF to PPT - Free Online Tool | PixMorph',
  description: 'Convert PDF to PowerPoint. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-ppt' }
}

export default function PdfToPptPage() {
  return (
    <ToolLayout
      title="PDF to PPT"
      description="Convert PDF to PowerPoint"
      icon={<FileText className="w-6 h-6" />}
    >
      <PdfToPpt />
    </ToolLayout>
  )
}
