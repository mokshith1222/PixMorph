import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FilePlus } from 'lucide-react'
import { PdfAddPage } from '@/components/conversion/PdfAddPage'

export const metadata: Metadata = {
  title: 'PDF Add Page - Free Online Tool | PixMorph',
  description: 'Add blank pages to PDF. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-add-page' }
}

export default function PdfAddPagePage() {
  return (
    <ToolLayout
      title="PDF Add Page"
      description="Add blank pages to PDF"
      icon={<FilePlus className="w-6 h-6" />}
    >
      <PdfAddPage />
    </ToolLayout>
  )
}
