import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { RefreshCw } from 'lucide-react'
import { PdfPageReorder } from '@/components/conversion/PdfPageReorder'

export const metadata: Metadata = {
  title: 'PDF Page Reorder - Free Online Tool | PixMorph',
  description: 'Reorder pages in PDF. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-page-reorder' }
}

export default function PdfPageReorderPage() {
  return (
    <ToolLayout
      title="PDF Page Reorder"
      description="Reorder pages in PDF"
      icon={<RefreshCw className="w-6 h-6" />}
    >
      <PdfPageReorder />
    </ToolLayout>
  )
}
