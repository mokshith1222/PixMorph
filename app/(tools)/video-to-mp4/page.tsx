import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Video } from 'lucide-react'
import { VideoToMP4 } from '@/components/conversion/VideoToMP4'

export const metadata: Metadata = {
  title: 'Video to MP4 - Free Online Tool | PixMorph',
  description: 'Convert video to MP4 online for free. Universal MP4 format compatible with all devices. Fast, free, and secure browser-based tool. Your files never leave...',
}

export default function VideoToMp4Page() {
  return (
    <ToolLayout title="Video to MP4" description="Convert video to MP4" icon={<Video className="w-6 h-6" />}>
      <VideoToMP4 />
    </ToolLayout>
  )
}