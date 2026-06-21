import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Scissors } from 'lucide-react'
import { VideoTrimmer } from '@/components/conversion/VideoTrimmer'

export const metadata: Metadata = {
  title: 'Video Trimmer - Free Online Tool | PixMorph',
  description: 'Trim video duration. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/video-trimmer' }
}

export default function VideoTrimmerPage() {
  return (
    <ToolLayout
      title="Video Trimmer"
      description="Trim video duration"
      icon={<Scissors className="w-6 h-6" />}
    >
      <VideoTrimmer />
    </ToolLayout>
  )
}
