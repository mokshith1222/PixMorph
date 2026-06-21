import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FilePlus } from 'lucide-react'
import { PdfPageExtractor } from '@/components/conversion/PdfPageExtractor'

export const metadata: Metadata = {
  title: 'PDF Page Extractor - Free Online Tool | PixMorph',
  description: 'Extract pages from PDF. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-page-extractor' }
}

export default function PdfPageExtractorPage() {
  return (
    <ToolLayout
      title="PDF Page Extractor"
      description="Extract pages from PDF"
      icon={<FilePlus className="w-6 h-6" />}
    >
      <PdfPageExtractor />
    </ToolLayout>
  )
}
