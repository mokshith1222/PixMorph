import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { HtmlEncoder } from '@/components/conversion/HtmlEncoder'

export const metadata: Metadata = {
  title: 'HTML Encoder - Free Online Tool | PixMorph',
  description: 'Encode HTML entities. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/html-encoder' }
}

export default function HtmlEncoderPage() {
  return (
    <ToolLayout
      title="HTML Encoder"
      description="Encode HTML entities"
      icon={<Code className="w-6 h-6" />}
    >
      <HtmlEncoder />
    </ToolLayout>
  )
}
