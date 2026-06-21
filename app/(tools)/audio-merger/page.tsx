import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Music } from 'lucide-react'
import { AudioMerger } from '@/components/conversion/AudioMerger'

export const metadata: Metadata = {
  title: 'Audio Merger - Free Online Tool | PixMorph',
  description: 'Merge audio files. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/audio-merger' }
}

export default function AudioMergerPage() {
  return (
    <ToolLayout
      title="Audio Merger"
      description="Merge audio files"
      icon={<Music className="w-6 h-6" />}
    >
      <AudioMerger />
    </ToolLayout>
  )
}
