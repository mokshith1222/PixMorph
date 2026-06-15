import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Sparkles } from 'lucide-react'
import { ImageEnhancer } from '@/components/conversion/ImageEnhancer'

export const metadata: Metadata = {
  title: 'Image Enhancer - Free Online Tool | PixMorph',
  description: 'Enhance image quality online for free. Improve brightness, contrast, and clarity with our image enhancer. Fast, free, and secure browser-based tool. Your...',
}

export default function ImageEnhancerPage() {
  return (
    <ToolLayout title="Image Enhancer" description="Enhance image quality" icon={<Sparkles className="w-6 h-6" />}>
      <ImageEnhancer />
    </ToolLayout>
  )
}