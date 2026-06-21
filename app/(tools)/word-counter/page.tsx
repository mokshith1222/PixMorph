import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Type } from 'lucide-react'
import { WordCounter } from '@/components/conversion/WordCounter'

export const metadata: Metadata = {
  title: 'Word Counter - Free Online Tool | PixMorph',
  description: 'Count words, characters, lines, and sentences in any text. Free online tool for writers and editors. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/word-counter' }
}

export default function WordCounterPage() {
  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, lines, and sentences"
      icon={<Type className="w-6 h-6" />}
    >
      <WordCounter />
    </ToolLayout>
  )
}
