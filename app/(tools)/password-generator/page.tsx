import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Key } from 'lucide-react'
import { PasswordGenerator } from '@/components/conversion/PasswordGenerator'

export const metadata: Metadata = {
  title: 'Password Generator - Free Online Tool | PixMorph',
  description: 'Generate secure passwords with customizable options. Free online tool for creating strong passwords. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/password-generator' }
}

export default function PasswordGeneratorPage() {
  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure passwords with customizable options"
      icon={<Key className="w-6 h-6" />}
    >
      <PasswordGenerator />
    </ToolLayout>
  )
}
