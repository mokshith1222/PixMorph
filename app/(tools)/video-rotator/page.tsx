import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { RotateCw } from 'lucide-react'
import { VideoRotator } from '@/components/conversion/VideoRotator'

export const metadata: Metadata = {
  title: 'Video Rotator - Free Online Tool | PixMorph',
  description: 'Rotate video. Free online tool.',
}

export default function VideoRotatorPage() {
  return (
    <ToolLayout
      title="Video Rotator"
      description="Rotate video"
      icon={<RotateCw className="w-6 h-6" />}
    >
      <VideoRotator />
    </ToolLayout>
  )
}
