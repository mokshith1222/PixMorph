import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Zap } from 'lucide-react'
import { WebsiteSpeedTest } from '@/components/conversion/WebsiteSpeedTest'

export const metadata: Metadata = {
  title: 'Website Speed Test - Free Online Tool | PixMorph',
  description: 'Test the speed and performance of any website. Free online tool for checking load times.',
}

export default function WebsiteSpeedTestPage() {
  return (
    <ToolLayout
      title="Website Speed Test"
      description="Test the speed and performance of any website"
      icon={<Zap className="w-6 h-6" />}
    >
      <WebsiteSpeedTest />
    </ToolLayout>
  )
}
