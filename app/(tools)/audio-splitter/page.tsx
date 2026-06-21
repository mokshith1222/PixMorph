import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Scissors } from 'lucide-react'
import { AudioSplitter } from '@/components/conversion/AudioSplitter'

export const metadata: Metadata = {
  title: 'Audio Splitter - Free Online Tool | PixMorph',
  description: 'Split audio into parts. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/audio-splitter' }
}

export default function AudioSplitterPage() {
  return (
    <ToolLayout
      title="Audio Splitter"
      description="Split audio into parts"
      icon={<Scissors className="w-6 h-6" />}
    >
      <AudioSplitter />
    </ToolLayout>
  )
}
