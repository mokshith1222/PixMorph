import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Hash } from 'lucide-react'
import { Md5Generator } from '@/components/conversion/Md5Generator'

export const metadata: Metadata = {
  title: 'MD5 Generator - Free Online Tool | PixMorph',
  description: 'Generate MD5 hash. Free online tool.',
}

export default function Md5GeneratorPage() {
  return (
    <ToolLayout
      title="MD5 Generator"
      description="Generate MD5 hash"
      icon={<Hash className="w-6 h-6" />}
    >
      <Md5Generator />
    </ToolLayout>
  )
}
