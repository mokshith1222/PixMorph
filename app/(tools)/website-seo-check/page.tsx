import { Metadata } from 'next'
import { ToolLayout } from '@/components/tools/ToolLayout'
import { Search } from 'lucide-react'
import { WebsiteSEOCheck } from '@/components/conversion/WebsiteSEOCheck'

export const metadata: Metadata = {
  title: 'Website SEO Check - Free Online Tool | PixMorph',
  description: 'Check the SEO health of any website. Free online tool for analyzing meta tags, headings, and more. Fast, free, and secure browser-based tool. Your files...',
  alternates: { canonical: '/website-seo-check' }
}

export default function WebsiteSEOCheckPage() {
  return (
    <ToolLayout
      title="Website SEO Check"
      description="Check the SEO health of any website"
      icon={<Search className="w-6 h-6" />}
    >
      <WebsiteSEOCheck />
    </ToolLayout>
  )
}
