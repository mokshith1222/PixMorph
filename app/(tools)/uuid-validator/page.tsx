import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Hash } from 'lucide-react'
import { UuidValidator } from '@/components/conversion/UuidValidator'

export const metadata: Metadata = {
  title: 'UUID Validator - Free Online Tool | PixMorph',
  description: 'Validate UUIDs. Free online tool.',
}

export default function UuidValidatorPage() {
  return (
    <ToolLayout
      title="UUID Validator"
      description="Validate UUIDs"
      icon={<Hash className="w-6 h-6" />}
    >
      <UuidValidator />
    </ToolLayout>
  )
}
