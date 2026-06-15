import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Video } from 'lucide-react'
import { VideoStabilizer } from '@/components/conversion/VideoStabilizer'

export const metadata: Metadata = {
  title: 'Video Stabilizer - Free Online Tool | PixMorph',
  description: 'Stabilize shaky video. Free online tool.',
}

export default function VideoStabilizerPage() {
  return (
    <ToolLayout
      title="Video Stabilizer"
      description="Stabilize shaky video"
      icon={<Video className="w-6 h-6" />}
    >
      <VideoStabilizer />
    </ToolLayout>
  )
}
