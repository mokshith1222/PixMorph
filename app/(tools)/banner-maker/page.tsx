import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { BannerMaker } from '@/components/conversion/BannerMaker'

export const metadata: Metadata = {
  title: 'Banner Maker - Free Online Tool | PixMorph',
  description: 'Create banners. Free online tool.',
}

export default function BannerMakerPage() {
  return (
    <ToolLayout
      title="Banner Maker"
      description="Create banners"
      icon={<Palette className="w-6 h-6" />}
    >
      <BannerMaker />
    </ToolLayout>
  )
}
