import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Film } from 'lucide-react'
import { VideoToGIF } from '@/components/conversion/VideoToGIF'

export const metadata: Metadata = {
  title: 'Video to GIF - Free Online Tool | PixMorph',
  description: 'Convert video to GIF online for free. Create animated GIFs from video clips easily.',
}

export default function VideoToGifPage() {
  return (
    <ToolLayout title="Video to GIF" description="Convert video to GIF" icon={<Film className="w-6 h-6" />}>
      <VideoToGIF />
    </ToolLayout>
  )
}