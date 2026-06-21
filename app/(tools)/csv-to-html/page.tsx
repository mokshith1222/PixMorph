import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { CsvToHtml } from '@/components/conversion/CsvToHtml'

export const metadata: Metadata = {
  title: 'CSV to HTML - Free Online Tool | PixMorph',
  description: 'Convert CSV to HTML table. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/csv-to-html' }
}

export default function CsvToHtmlPage() {
  return (
    <ToolLayout
      title="CSV to HTML"
      description="Convert CSV to HTML table"
      icon={<Code className="w-6 h-6" />}
    >
      <CsvToHtml />
    </ToolLayout>
  )
}
