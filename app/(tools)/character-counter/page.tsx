import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Type } from 'lucide-react'
import { CharacterCounter } from '@/components/conversion/CharacterCounter'

export const metadata: Metadata = {
  title: 'Character Counter - Free Online Tool | PixMorph',
  description: 'Count characters in text. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/character-counter' }
}

export default function CharacterCounterPage() {
  return (
    <ToolLayout
      title="Character Counter"
      description="Count characters in text"
      icon={<Type className="w-6 h-6" />}
    >
      <CharacterCounter />
    </ToolLayout>
  )
}
