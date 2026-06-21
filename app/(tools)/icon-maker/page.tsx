import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { IconMaker } from '@/components/conversion/IconMaker'

export const metadata: Metadata = {
  title: 'Icon Maker - Free Online Tool | PixMorph',
  description: 'Create custom icons. Free online tool. All processing is done locally in your browser for maximum privacy and security. Enhance your workflow today.',
  alternates: { canonical: '/icon-maker' }
}

export default function IconMakerPage() {
  return (
    <ToolLayout
      title="Icon Maker"
      description="Create custom icons"
      icon={<Palette className="w-6 h-6" />}
    >
      <IconMaker />
    </ToolLayout>
  )
}
