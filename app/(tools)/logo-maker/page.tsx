import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Palette } from 'lucide-react'
import { LogoMaker } from '@/components/conversion/LogoMaker'

export const metadata: Metadata = {
  title: 'Logo Maker - Free Online Tool | PixMorph',
  description: 'Create custom logos. Free online tool.',
}

export default function LogoMakerPage() {
  return (
    <ToolLayout
      title="Logo Maker"
      description="Create custom logos"
      icon={<Palette className="w-6 h-6" />}
    >
      <LogoMaker />
    </ToolLayout>
  )
}
