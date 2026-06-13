import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { AudioCompressor } from '@/components/conversion/AudioCompressor'

export const metadata: Metadata = {
  title: 'Audio Compressor - Free Online Tool | PixMorph',
  description: 'Compress audio files online for free. Reduce audio file size while maintaining sound quality.',
}

export default function AudioCompressorPage() {
  return (
    <ToolLayout title="Audio Compressor" description="Compress audio files" icon={<Zap className="w-6 h-6" />}>
      <AudioCompressor />
    </ToolLayout>
  )
}