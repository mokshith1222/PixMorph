import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Focus } from 'lucide-react'
import { ImageSharper } from '@/components/conversion/ImageSharper'

export const metadata: Metadata = {
  title: 'Image Sharper - Free Online Tool | PixMorph',
  description: 'Sharpen blurry images online for free. Make photos crisper and clearer with our image sharpening tool. Fast, free, and secure browser-based tool. Your...',
}

export default function ImageSharperPage() {
  return (
    <ToolLayout title="Image Sharper" description="Sharpen blurry images" icon={<Focus className="w-6 h-6" />}>
      <ImageSharper />
    </ToolLayout>
  )
}