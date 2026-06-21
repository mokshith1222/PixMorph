import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FileImage } from 'lucide-react'
import { PDFToJPG } from '@/components/conversion/PDFToJPG'

export const metadata: Metadata = {
  title: 'PDF to JPG - Free Online Tool | PixMorph',
  description: 'Convert PDF pages to JPG images online for free. Extract high-quality images from PDF documents. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/pdf-to-jpg' }
}

export default function PdfToJpgPage() {
  return (
    <ToolLayout title="PDF to JPG" description="Convert PDF pages to JPG" icon={<FileImage className="w-6 h-6" />}>
      <PDFToJPG />
    </ToolLayout>
  )
}