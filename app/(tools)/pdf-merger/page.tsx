import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Files } from 'lucide-react'
import { PDFMerger } from '@/components/conversion/PDFMerger'

export const metadata: Metadata = {
  title: 'PDF Merger - Free Online Tool | PixMorph',
  description: 'Merge PDF files online for free. Combine multiple PDF documents into a single file.',
}

export default function PdfMergerPage() {
  return (
    <ToolLayout title="PDF Merger" description="Merge PDF files" icon={<Files className="w-6 h-6" />}>
      <PDFMerger />
    </ToolLayout>
  )
}