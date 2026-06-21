import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Eraser } from 'lucide-react'
import { WatermarkRemover } from '@/components/conversion/WatermarkRemover'

export const metadata: Metadata = {
  title: 'Watermark Remover - Free Online Tool | PixMorph',
  description: 'Remove watermarks from images and videos effortlessly. Free online tool. All processing is done locally in your browser for maximum privacy and security. En...',
  alternates: { canonical: '/watermark-remover' }
}

export default function WatermarkRemoverPage() {
  return (
    <ToolLayout
      title="Watermark Remover"
      description="Remove watermarks from images and videos"
      icon={<Eraser className="w-6 h-6" />}
    >
      <WatermarkRemover />
    </ToolLayout>
  )
}
