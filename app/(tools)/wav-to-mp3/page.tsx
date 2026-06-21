import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Music } from 'lucide-react'
import { WAVToMP3 } from '@/components/conversion/WAVToMP3'

export const metadata: Metadata = {
  title: 'WAV to MP3 - Free Online Tool | PixMorph',
  description: 'Convert WAV to MP3 online for free. Compress audio files to smaller MP3 format. Fast, free, and secure browser-based tool. Your files never leave your device.',
  alternates: { canonical: '/wav-to-mp3' }
}

export default function WavToMp3Page() {
  return (
    <ToolLayout title="WAV to MP3" description="Convert WAV to MP3" icon={<Music className="w-6 h-6" />}>
      <WAVToMP3 />
    </ToolLayout>
  )
}