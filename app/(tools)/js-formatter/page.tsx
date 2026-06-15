import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { JsFormatter } from '@/components/conversion/JsFormatter'

export const metadata: Metadata = {
  title: 'JS Formatter - Free Online Tool | PixMorph',
  description: 'Format JavaScript code. Free online tool.',
}

export default function JsFormatterPage() {
  return (
    <ToolLayout
      title="JS Formatter"
      description="Format JavaScript code"
      icon={<Code className="w-6 h-6" />}
    >
      <JsFormatter />
    </ToolLayout>
  )
}
