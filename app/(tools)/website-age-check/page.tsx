import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Globe } from 'lucide-react'
import { WebsiteAgeCheck } from '@/components/conversion/WebsiteAgeCheck'

export const metadata: Metadata = {
  title: 'Website Age Check - Free Online Tool | PixMorph',
  description: 'Check domain age. Free online tool.',
}

export default function WebsiteAgeCheckPage() {
  return (
    <ToolLayout
      title="Website Age Check"
      description="Check domain age"
      icon={<Globe className="w-6 h-6" />}
    >
      <WebsiteAgeCheck />
    </ToolLayout>
  )
}
