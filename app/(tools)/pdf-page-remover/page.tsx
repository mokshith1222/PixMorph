import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileMinus } from 'lucide-react'
import { PdfPageRemover } from '@/components/conversion/PdfPageRemover'

export const metadata: Metadata = {
  title: 'PDF Page Remover - Free Online Tool | PixMorph',
  description: 'Remove pages from PDF. Free online tool.',
}

export default function PdfPageRemoverPage() {
  return (
    <ToolLayout
      title="PDF Page Remover"
      description="Remove pages from PDF"
      icon={<FileMinus className="w-6 h-6" />}
    >
      <PdfPageRemover />
    </ToolLayout>
  )
}
