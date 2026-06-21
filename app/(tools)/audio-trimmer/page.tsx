import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Scissors } from 'lucide-react'
import { AudioTrimmer } from '@/components/conversion/AudioTrimmer'

export const metadata: Metadata = {
  title: 'Audio Trimmer - Free Online Tool | PixMorph',
  description: 'Trim audio clips online for free. Cut and trim audio files to your desired length. Fast, free, and secure browser-based tool. Your files never leave your...',
  alternates: { canonical: '/audio-trimmer' }
}

export default function AudioTrimmerPage() {
  return (
    <ToolLayout title="Audio Trimmer" description="Trim audio clips" icon={<Scissors className="w-6 h-6" />}>
      <AudioTrimmer />
    </ToolLayout>
  )
}