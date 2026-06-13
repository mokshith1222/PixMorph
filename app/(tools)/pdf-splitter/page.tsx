import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Scissors } from 'lucide-react'
import { PDFSplitter } from '@/components/conversion/PDFSplitter'

export const metadata: Metadata = {
  title: 'PDF Splitter - Free Online Tool | PixMorph',
  description: 'Split PDF into separate pages online for free. Extract individual pages from PDF documents.',
}

export default function PdfSplitterPage() {
  return (
    <ToolLayout title="PDF Splitter" description="Split PDF into pages" icon={<Scissors className="w-6 h-6" />}>
      <PDFSplitter />
    </ToolLayout>
  )
}