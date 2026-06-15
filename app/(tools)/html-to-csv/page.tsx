import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { HtmlToCsv } from '@/components/conversion/HtmlToCsv'

export const metadata: Metadata = {
  title: 'HTML to CSV - Free Online Tool | PixMorph',
  description: 'Convert HTML table to CSV. Free online tool.',
}

export default function HtmlToCsvPage() {
  return (
    <ToolLayout
      title="HTML to CSV"
      description="Convert HTML table to CSV"
      icon={<Code className="w-6 h-6" />}
    >
      <HtmlToCsv />
    </ToolLayout>
  )
}
