import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { PdfToHtml } from '@/components/conversion/PdfToHtml'

export const metadata: Metadata = {
  title: 'PDF to HTML - Free Online Tool | PixMorph',
  description: 'Convert PDF to HTML. Free online tool.',
}

export default function PdfToHtmlPage() {
  return (
    <ToolLayout
      title="PDF to HTML"
      description="Convert PDF to HTML"
      icon={<Code className="w-6 h-6" />}
    >
      <PdfToHtml />
    </ToolLayout>
  )
}
