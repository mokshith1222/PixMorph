import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { JsonToYaml } from '@/components/conversion/JsonToYaml'

export const metadata: Metadata = {
  title: 'JSON to YAML - Free Online Tool | PixMorph',
  description: 'Convert JSON to YAML. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/json-to-yaml' }
}

export default function JsonToYamlPage() {
  return (
    <ToolLayout
      title="JSON to YAML"
      description="Convert JSON to YAML"
      icon={<Code className="w-6 h-6" />}
    >
      <JsonToYaml />
    </ToolLayout>
  )
}
