'use client'

import { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { AdTop, AdMiddle, AdBottom } from '@/components/ui/AdPlaceholder'

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
  icon?: ReactNode
}

export function ToolLayout({
  title,
  description,
  children,
  icon,
}: ToolLayoutProps) {
  return (
    <Container>
      <AdTop />
      <div className="py-8">
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
              {icon}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-display font-bold">{title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
        
        <Card className="p-6 mb-12">{children}</Card>

        {/* Dynamic Tool Content & FAQ */}
        <div className="mt-12 space-y-12">
          <section className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold font-display mb-4">About {title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}. Our <strong>{title}</strong> is a fast, free, and secure online tool designed to run entirely within your web browser. This means that no files are ever uploaded to our servers, ensuring your data remains completely private and secure. Whether you're on a desktop or a mobile device, our {title} offers professional-grade functionality without the need to download any software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-display mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-2">Is {title} free to use?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes! Our {title} is 100% free with no hidden limits, watermarks, or subscriptions required.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-2">Is my data secure when using {title}?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Absolutely. All processing happens locally in your browser. We never upload, store, or share your files. Your privacy is our top priority.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg mb-2">Does this work on mobile devices?</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, {title} is fully responsive and works seamlessly on any device, including smartphones, tablets, and desktop computers.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <AdMiddle />
      <AdBottom />
    </Container>
  )
}
