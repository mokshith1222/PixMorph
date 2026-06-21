import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sparkles } from 'lucide-react'
import { CodeBeautifier } from '@/components/conversion/CodeBeautifier'

export const metadata: Metadata = {
  title: 'Code Beautifier - Free Online Tool | PixMorph',
  description: 'Format and beautify code online for free. Make your code readable with proper indentation and styling. Fast, free, and secure browser-based tool. Your...',
  alternates: { canonical: '/code-beautifier' }
}

export default function CodeBeautifierPage() {
  return (
    <ToolLayout title="Code Beautifier" description="Format and beautify code" icon={<Sparkles className="w-6 h-6" />}>
      <CodeBeautifier />
    </ToolLayout>
  )
}