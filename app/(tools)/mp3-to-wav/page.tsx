import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Music } from 'lucide-react'
import { MP3ToWAV } from '@/components/conversion/MP3ToWAV'

export const metadata: Metadata = {
  title: 'MP3 to WAV - Free Online Tool | PixMorph',
  description: 'Convert MP3 to WAV online for free. High-quality uncompressed audio conversion. Fast, free, and secure browser-based tool. Your files never leave your device.',
  alternates: { canonical: '/mp3-to-wav' }
}

export default function Mp3ToWavPage() {
  return (
    <ToolLayout title="MP3 to WAV" description="Convert MP3 to WAV" icon={<Music className="w-6 h-6" />}>
      <MP3ToWAV />
    </ToolLayout>
  )
}