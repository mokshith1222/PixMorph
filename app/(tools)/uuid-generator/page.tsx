import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Hash } from 'lucide-react'
import { UUIDGenerator } from '@/components/conversion/UUIDGenerator'

export const metadata: Metadata = {
  title: 'UUID Generator - Free Online Tool | PixMorph',
  description: 'Generate universally unique identifiers (UUIDs). Free online tool for creating random UUIDs.',
}

export default function UUIDGeneratorPage() {
  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs)"
      icon={<Hash className="w-6 h-6" />}
    >
      <UUIDGenerator />
    </ToolLayout>
  )
}
