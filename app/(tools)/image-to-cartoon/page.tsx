import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Smile } from 'lucide-react'
import { ImageToCartoon } from '@/components/conversion/ImageToCartoon'

export const metadata: Metadata = {
  title: 'Image to Cartoon - Free Online Tool | PixMorph',
  description: 'Convert any image to a cartoon style. Free online tool for creating cartoons from photos. Fast, free, and secure browser-based tool. Your files never leave...',
  alternates: { canonical: '/image-to-cartoon' }
}

export default function ImageToCartoonPage() {
  return (
    <ToolLayout
      title="Image to Cartoon"
      description="Convert any image to a cartoon style"
      icon={<Smile className="w-6 h-6" />}
    >
      <ImageToCartoon />
    </ToolLayout>
  )
}
