import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { CodeMinifier } from '@/components/conversion/CodeMinifier'

export const metadata: Metadata = {
  title: 'Code Minifier - Free Online Tool | PixMorph',
  description: 'Minify code files online for free. Reduce code size by removing whitespace and comments. Fast, free, and secure browser-based tool. Your files never leave...',
  alternates: { canonical: '/code-minifier' }
}

export default function CodeMinifierPage() {
  return (
    <ToolLayout title="Code Minifier" description="Minify code files" icon={<Zap className="w-6 h-6" />}>
      <CodeMinifier />
    </ToolLayout>
  )
}