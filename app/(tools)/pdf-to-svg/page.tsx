import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Image } from 'lucide-react'
import { PdfToSvg } from '@/components/conversion/PdfToSvg'

export const metadata: Metadata = {
  title: 'PDF to SVG - Free Online Tool | PixMorph',
  description: 'Convert PDF to SVG. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/pdf-to-svg' }
}

export default function PdfToSvgPage() {
  return (
    <ToolLayout
      title="PDF to SVG"
      description="Convert PDF to SVG"
      icon={<Image className="w-6 h-6" />}
    >
      <PdfToSvg />
    </ToolLayout>
  )
}
