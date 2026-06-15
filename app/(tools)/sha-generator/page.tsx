import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Hash } from 'lucide-react'
import { ShaGenerator } from '@/components/conversion/ShaGenerator'

export const metadata: Metadata = {
  title: 'SHA Generator - Free Online Tool | PixMorph',
  description: 'Generate SHA hash. Free online tool.',
}

export default function ShaGeneratorPage() {
  return (
    <ToolLayout
      title="SHA Generator"
      description="Generate SHA hash"
      icon={<Hash className="w-6 h-6" />}
    >
      <ShaGenerator />
    </ToolLayout>
  )
}
