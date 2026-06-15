import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pixmorph.com'),
  title: {
    default: 'PixMorph - 100+ Free Browser-Based Image, Audio & PDF Tools',
    template: '%s | PixMorph',
  },
  description:
    'Access 100+ free, secure online tools for image, audio, and PDF editing. PixMorph runs entirely in your browser—your files never leave your device.',
  keywords: [
    'free online tools',
    'image converter',
    'pdf compressor',
    'video compressor',
    'audio editor',
    'pdf editor',
    'video cropper',
    'image resizer',
    'browser based tools',
    'local first tools',
    'file converter',
    'web tools',
    'developer tools',
    'design tools',
    'free logo maker',
    'privacy-first utilities',
    'free digital tools'
  ],
  openGraph: {
    title: {
      default: 'PixMorph - 100+ Free Browser-Based Image, Audio & PDF Tools',
      template: '%s | PixMorph',
    },
    description: 'Access 100+ free, secure online tools for image, audio, and PDF editing. PixMorph runs entirely in your browser—your files never leave your device.',
    url: 'https://pixmorph.com',
    siteName: 'PixMorph',
    images: [
      {
        url: 'https://pixmorph.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PixMorph - Free Online Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: 'PixMorph - 100+ Free Browser-Based Image, Audio & PDF Tools',
      template: '%s | PixMorph',
    },
    description: 'Access 100+ free, secure online tools for image, audio, and PDF editing. PixMorph runs entirely in your browser—your files never leave your device.',
    images: ['https://pixmorph.com/og-image.jpg'],
  },
  verification: {
    google: 'googlefbfa23743896d7f7',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
