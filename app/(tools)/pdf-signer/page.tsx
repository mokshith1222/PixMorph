import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { PenTool } from 'lucide-react'
import { PDFSigner } from '@/components/conversion/PDFSigner'

export const metadata: Metadata = {
  title: 'PDF Signer - Free Online Tool | PixMorph',
  description: 'Sign PDF documents online for free. Add your signature to PDF files quickly and securely. Fast, free, and secure browser-based tool. Your files never leave...',
  alternates: { canonical: '/pdf-signer' }
}

export default function PdfSignerPage() {
  return (
    <ToolLayout title="PDF Signer" description="Sign PDF documents" icon={<PenTool className="w-6 h-6" />}>
      <PDFSigner />
    </ToolLayout>
  )
}