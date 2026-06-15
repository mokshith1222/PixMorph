import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Camera } from 'lucide-react'
import { WebsiteScreenshot } from '@/components/conversion/WebsiteScreenshot'

export const metadata: Metadata = {
  title: 'Website Screenshot - Free Online Tool | PixMorph',
  description: 'Capture screenshots of any website. Free online tool for taking full-page screenshots. Fast, free, and secure browser-based tool. Your files never leave...',
}

export default function WebsiteScreenshotPage() {
  return (
    <ToolLayout
      title="Website Screenshot"
      description="Capture screenshots of any website"
      icon={<Camera className="w-6 h-6" />}
    >
      <WebsiteScreenshot />
    </ToolLayout>
  )
}
