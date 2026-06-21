import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { MarkdownToHtml } from '@/components/conversion/MarkdownToHtml'

export const metadata: Metadata = {
  title: 'Markdown to HTML - Free Online Tool | PixMorph',
  description: 'Convert Markdown to HTML. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/markdown-to-html' }
}

export default function MarkdownToHtmlPage() {
  return (
    <ToolLayout
      title="Markdown to HTML"
      description="Convert Markdown to HTML"
      icon={<Code className="w-6 h-6" />}
    >
      <MarkdownToHtml />
    </ToolLayout>
  )
}
