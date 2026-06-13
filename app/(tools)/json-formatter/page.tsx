import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Braces } from 'lucide-react'
import { JSONFormatter } from '@/components/conversion/JSONFormatter'

export const metadata: Metadata = {
  title: 'JSON Formatter - Free Online Tool | PixMorph',
  description: 'Format and beautify JSON data. Free online tool for pretty-printing JSON with proper indentation.',
}

export default function JSONFormatterPage() {
  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format and beautify JSON data"
      icon={<Braces className="w-6 h-6" />}
    >
      <JSONFormatter />
    </ToolLayout>
  )
}
