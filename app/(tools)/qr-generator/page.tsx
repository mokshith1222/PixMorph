import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { QrCode } from 'lucide-react'
import { QRGenerator } from '@/components/conversion/QRGenerator'

export const metadata: Metadata = {
  title: 'QR Code Generator - Free Online Tool | PixMorph',
  description: 'Generate QR codes instantly for any URL or text. Free online tool for creating scannable QR codes. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/qr-generator' }
}

export default function QRGeneratorPage() {
  return (
    <ToolLayout
      title="QR Code Generator"
      description="Generate QR codes instantly for any URL or text"
      icon={<QrCode className="w-6 h-6" />}
    >
      <QRGenerator />
    </ToolLayout>
  )
}
