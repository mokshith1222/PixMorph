import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Link } from 'lucide-react'
import { URLEncoder } from '@/components/conversion/URLEncoder'

export const metadata: Metadata = {
  title: 'URL Encoder - Free Online Tool | PixMorph',
  description: 'Encode URLs and query parameters. Free online tool for URL encoding. Fast, free, and secure browser-based tool. Your files never leave your device.',
}

export default function URLEncoderPage() {
  return (
    <ToolLayout
      title="URL Encoder"
      description="Encode URLs and query parameters"
      icon={<Link className="w-6 h-6" />}
    >
      <URLEncoder />
    </ToolLayout>
  )
}
