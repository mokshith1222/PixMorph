import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { PdfToJson } from '@/components/conversion/PdfToJson'

export const metadata: Metadata = {
  title: 'PDF to JSON - Free Online Tool | PixMorph',
  description: 'Convert PDF to JSON. Free online tool.',
}

export default function PdfToJsonPage() {
  return (
    <ToolLayout
      title="PDF to JSON"
      description="Convert PDF to JSON"
      icon={<Code className="w-6 h-6" />}
    >
      <PdfToJson />
    </ToolLayout>
  )
}
