import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Volume2 } from 'lucide-react'
import { VolumeBooster } from '@/components/conversion/VolumeBooster'

export const metadata: Metadata = {
  title: 'Volume Booster - Free Online Tool | PixMorph',
  description: 'Boost audio volume online for free. Increase the loudness of your audio files easily.',
}

export default function AudioVolumeBoosterPage() {
  return (
    <ToolLayout title="Volume Booster" description="Boost audio volume" icon={<Volume2 className="w-6 h-6" />}>
      <VolumeBooster />
    </ToolLayout>
  )
}