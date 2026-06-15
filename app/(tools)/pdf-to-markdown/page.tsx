import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileText } from 'lucide-react'
import { PdfToMarkdown } from '@/components/conversion/PdfToMarkdown'

export const metadata: Metadata = {
  title: 'PDF to Markdown - Free Online Tool | PixMorph',
  description: 'Convert PDF to Markdown. Free online tool.',
}

export default function PdfToMarkdownPage() {
  return (
    <ToolLayout
      title="PDF to Markdown"
      description="Convert PDF to Markdown"
      icon={<FileText className="w-6 h-6" />}
    >
      <PdfToMarkdown />
    </ToolLayout>
  )
}
