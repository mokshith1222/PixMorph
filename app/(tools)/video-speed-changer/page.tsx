import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { FastForward } from 'lucide-react'
import { VideoSpeedChanger } from '@/components/conversion/VideoSpeedChanger'

export const metadata: Metadata = {
  title: 'Video Speed Changer - Free Online Tool | PixMorph',
  description: 'Change video playback speed. Free online tool.',
}

export default function VideoSpeedChangerPage() {
  return (
    <ToolLayout
      title="Video Speed Changer"
      description="Change video playback speed"
      icon={<FastForward className="w-6 h-6" />}
    >
      <VideoSpeedChanger />
    </ToolLayout>
  )
}
