import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Globe } from 'lucide-react'
import { WebsiteDnsLookup } from '@/components/conversion/WebsiteDnsLookup'

export const metadata: Metadata = {
  title: 'Website DNS Lookup - Free Online Tool | PixMorph',
  description: 'DNS Records Lookup. Free online tool.',
}

export default function WebsiteDnsLookupPage() {
  return (
    <ToolLayout
      title="Website DNS Lookup"
      description="DNS Records Lookup"
      icon={<Globe className="w-6 h-6" />}
    >
      <WebsiteDnsLookup />
    </ToolLayout>
  )
}
