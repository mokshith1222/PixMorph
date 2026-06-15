import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { CssMinifier } from '@/components/conversion/CssMinifier'

export const metadata: Metadata = {
  title: 'CSS Minifier - Free Online Tool | PixMorph',
  description: 'Minify CSS code. Free online tool.',
}

export default function CssMinifierPage() {
  return (
    <ToolLayout
      title="CSS Minifier"
      description="Minify CSS code"
      icon={<Code className="w-6 h-6" />}
    >
      <CssMinifier />
    </ToolLayout>
  )
}
