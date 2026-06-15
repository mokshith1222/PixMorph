import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Music } from 'lucide-react'
import { VideoToMP3 } from '@/components/conversion/VideoToMP3'

export const metadata: Metadata = {
  title: 'Video to MP3 - Free Online Tool | PixMorph',
  description: 'Extract audio from video online for free. Convert video files to MP3 audio format. Fast, free, and secure browser-based tool. Your files never leave your...',
}

export default function VideoToMp3Page() {
  return (
    <ToolLayout title="Video to MP3" description="Extract audio from video" icon={<Music className="w-6 h-6" />}>
      <VideoToMP3 />
    </ToolLayout>
  )
}