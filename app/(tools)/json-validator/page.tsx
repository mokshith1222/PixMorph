import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Code } from 'lucide-react'
import { JsonValidator } from '@/components/conversion/JsonValidator'

export const metadata: Metadata = {
  title: 'JSON Validator - Free Online Tool | PixMorph',
  description: 'Validate JSON formatting. Free online tool.',
}

export default function JsonValidatorPage() {
  return (
    <ToolLayout
      title="JSON Validator"
      description="Validate JSON formatting"
      icon={<Code className="w-6 h-6" />}
    >
      <JsonValidator />
    </ToolLayout>
  )
}
