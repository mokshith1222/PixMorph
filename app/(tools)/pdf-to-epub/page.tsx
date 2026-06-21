import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Book } from 'lucide-react'
import { PdfToEpub } from '@/components/conversion/PdfToEpub'

export const metadata: Metadata = {
  title: 'PDF to ePub - Free Online Tool | PixMorph',
  description: 'Convert PDF to ePub. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-epub' }
}

export default function PdfToEpubPage() {
  return (
    <ToolLayout
      title="PDF to ePub"
      description="Convert PDF to ePub"
      icon={<Book className="w-6 h-6" />}
    >
      <PdfToEpub />
    </ToolLayout>
  )
}
