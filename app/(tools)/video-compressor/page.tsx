import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { VideoCompressor } from '@/components/conversion/VideoCompressor'

export const metadata: Metadata = {
  title: 'Video Compressor - Free Online Tool | PixMorph',
  description: 'Compress video files online for free. Reduce video file size without significant quality loss. Fast, free, and secure browser-based tool. Your files never...',
  alternates: { canonical: '/video-compressor' }
}

export default function VideoCompressorPage() {
  return (
    <ToolLayout title="Video Compressor" description="Compress video files" icon={<Zap className="w-6 h-6" />}>
      <VideoCompressor />
    </ToolLayout>
  )
}