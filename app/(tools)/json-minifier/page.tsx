import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { JsonMinifier } from '@/components/conversion/JsonMinifier'

export const metadata: Metadata = {
  title: 'JSON Minifier - Free Online Tool | PixMorph',
  description: 'Minify JSON objects. Free online tool.',
}

export default function JsonMinifierPage() {
  return (
    <ToolLayout
      title="JSON Minifier"
      description="Minify JSON objects"
      icon={<Code className="w-6 h-6" />}
    >
      <JsonMinifier />
    </ToolLayout>
  )
}
