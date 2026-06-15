import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Link } from 'lucide-react'
import { UrlDecoder } from '@/components/conversion/UrlDecoder'

export const metadata: Metadata = {
  title: 'URL Decoder - Free Online Tool | PixMorph',
  description: 'Decode URLs. Free online tool.',
}

export default function UrlDecoderPage() {
  return (
    <ToolLayout
      title="URL Decoder"
      description="Decode URLs"
      icon={<Link className="w-6 h-6" />}
    >
      <UrlDecoder />
    </ToolLayout>
  )
}
