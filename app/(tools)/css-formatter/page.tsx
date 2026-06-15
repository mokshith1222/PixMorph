import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { CssFormatter } from '@/components/conversion/CssFormatter'

export const metadata: Metadata = {
  title: 'CSS Formatter - Free Online Tool | PixMorph',
  description: 'Format CSS code. Free online tool.',
}

export default function CssFormatterPage() {
  return (
    <ToolLayout
      title="CSS Formatter"
      description="Format CSS code"
      icon={<Code className="w-6 h-6" />}
    >
      <CssFormatter />
    </ToolLayout>
  )
}
