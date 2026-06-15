import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Lock } from 'lucide-react'
import { Base64Encoder } from '@/components/conversion/Base64Encoder'

export const metadata: Metadata = {
  title: 'Base64 Encoder - Free Online Tool | PixMorph',
  description: 'Encode text or files to Base64 format. Free online tool for Base64 encoding. Fast, free, and secure browser-based tool. Your files never leave your device.',
}

export default function Base64EncoderPage() {
  return (
    <ToolLayout
      title="Base64 Encoder"
      description="Encode text or files to Base64 format"
      icon={<Lock className="w-6 h-6" />}
    >
      <Base64Encoder />
    </ToolLayout>
  )
}
