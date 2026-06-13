import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Scan } from 'lucide-react'
import { QRScanner } from '@/components/conversion/QRScanner'

export const metadata: Metadata = {
  title: 'QR Code Scanner - Free Online Tool | PixMorph',
  description: 'Scan QR codes using your camera. Free online tool for reading QR codes from images or live camera.',
}

export default function QRScannerPage() {
  return (
    <ToolLayout
      title="QR Code Scanner"
      description="Scan QR codes using your camera"
      icon={<Scan className="w-6 h-6" />}
    >
      <QRScanner />
    </ToolLayout>
  )
}
