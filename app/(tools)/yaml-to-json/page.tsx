import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { YamlToJson } from '@/components/conversion/YamlToJson'

export const metadata: Metadata = {
  title: 'YAML to JSON - Free Online Tool | PixMorph',
  description: 'Convert YAML to JSON. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/yaml-to-json' }
}

export default function YamlToJsonPage() {
  return (
    <ToolLayout
      title="YAML to JSON"
      description="Convert YAML to JSON"
      icon={<Code className="w-6 h-6" />}
    >
      <YamlToJson />
    </ToolLayout>
  )
}
