import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { Base64Decoder } from '@/components/conversion/Base64Decoder'

export const metadata: Metadata = {
  title: 'Base64 Decoder - Free Online Tool | PixMorph',
  description: 'Decode Base64 strings. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/base64-decoder' }
}

export default function Base64DecoderPage() {
  return (
    <ToolLayout
      title="Base64 Decoder"
      description="Decode Base64 strings"
      icon={<Code className="w-6 h-6" />}
    >
      <Base64Decoder />
    </ToolLayout>
  )
}
