import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Smartphone } from 'lucide-react'
import { PdfToMobi } from '@/components/conversion/PdfToMobi'

export const metadata: Metadata = {
  title: 'PDF to MOBI - Free Online Tool | PixMorph',
  description: 'Convert PDF to MOBI. Free online tool.',
}

export default function PdfToMobiPage() {
  return (
    <ToolLayout
      title="PDF to MOBI"
      description="Convert PDF to MOBI"
      icon={<Smartphone className="w-6 h-6" />}
    >
      <PdfToMobi />
    </ToolLayout>
  )
}
