import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { QrCode } from 'lucide-react'
import { WebsiteQR } from '@/components/conversion/WebsiteQR'

export const metadata: Metadata = {
  title: 'Website QR Code - Free Online Tool | PixMorph',
  description: 'Generate QR codes for any website URL. Free online tool for creating scannable QR codes.',
}

export default function WebsiteQRPage() {
  return (
    <ToolLayout
      title="Website QR Code"
      description="Generate QR codes for any website URL"
      icon={<QrCode className="w-6 h-6" />}
    >
      <WebsiteQR />
    </ToolLayout>
  )
}
