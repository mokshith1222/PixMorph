import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Shield } from 'lucide-react'
import { WebsiteSecurityCheck } from '@/components/conversion/WebsiteSecurityCheck'

export const metadata: Metadata = {
  title: 'Website Security Check - Free Online Tool | PixMorph',
  description: 'Check the security of any website. Free online tool for verifying SSL, headers, and security best practices. Fast, free, and secure browser-based tool....',
  alternates: { canonical: '/website-security-check' }
}

export default function WebsiteSecurityCheckPage() {
  return (
    <ToolLayout
      title="Website Security Check"
      description="Check the security of any website"
      icon={<Shield className="w-6 h-6" />}
    >
      <WebsiteSecurityCheck />
    </ToolLayout>
  )
}
