import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { PdfToXml } from '@/components/conversion/PdfToXml'

export const metadata: Metadata = {
  title: 'PDF to XML - Free Online Tool | PixMorph',
  description: 'Convert PDF to XML. Free online tool.',
}

export default function PdfToXmlPage() {
  return (
    <ToolLayout
      title="PDF to XML"
      description="Convert PDF to XML"
      icon={<Code className="w-6 h-6" />}
    >
      <PdfToXml />
    </ToolLayout>
  )
}
