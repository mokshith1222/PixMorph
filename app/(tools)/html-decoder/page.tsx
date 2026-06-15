import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { HtmlDecoder } from '@/components/conversion/HtmlDecoder'

export const metadata: Metadata = {
  title: 'HTML Decoder - Free Online Tool | PixMorph',
  description: 'Decode HTML entities. Free online tool.',
}

export default function HtmlDecoderPage() {
  return (
    <ToolLayout
      title="HTML Decoder"
      description="Decode HTML entities"
      icon={<Code className="w-6 h-6" />}
    >
      <HtmlDecoder />
    </ToolLayout>
  )
}
