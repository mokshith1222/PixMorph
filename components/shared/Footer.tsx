import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Logo } from './Logo'
import { Twitter, Github, Instagram, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-16 pb-8 mt-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          <div className="col-span-2">
            <Logo />
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed pr-6">
              70+ free, fast, and secure browser-based tools. Your privacy is our priority—everything happens locally in your browser. No uploads, no limits.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-500 hover:bg-sky-100 dark:hover:bg-sky-900/40 hover:scale-110 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 flex items-center justify-center text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/40 hover:scale-110 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://github.com/mokshith1222/PixMorph" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-110 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="mailto:mokshithnaik932@gmail.com" aria-label="Email"
                className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 flex items-center justify-center text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900/40 hover:scale-110 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Image Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wide">Image</h3>
            <ul className="space-y-3 text-sm">
              {[
                ['Image Compressor', '/image-compressor'],
                ['HEIC to JPG', '/heic-to-jpg'],
                ['Color Extractor', '/image-color-extractor'],
                ['Image to Sketch', '/image-to-sketch'],
                ['Image to Cartoon', '/image-to-cartoon'],
                ['Image to Painting', '/image-to-painting'],
                ['Image to B&W', '/image-to-bw'],
                ['Image Blurrer', '/image-blurrer'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Audio & PDF */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wide">Audio</h3>
            <ul className="space-y-3 text-sm mb-8">
              {[
                ['Audio Trimmer', '/audio-trimmer'],
                ['Audio Compressor', '/audio-compressor'],
                ['Volume Booster', '/audio-volume-booster'],
                ['MP3 to WAV', '/mp3-to-wav'],
                ['WAV to MP3', '/wav-to-mp3'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wide">PDF</h3>
            <ul className="space-y-3 text-sm">
              {[
                ['PDF to JPG', '/pdf-to-jpg'],
                ['PDF to Word', '/pdf-to-word'],
                ['PDF Compressor', '/pdf-compressor'],
                ['PDF Merger', '/pdf-merger'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wide">Utility</h3>
            <ul className="space-y-3 text-sm mb-8">
              {[
                ['QR Generator', '/qr-generator'],
                ['Password Generator', '/password-generator'],
                ['Word Counter', '/word-counter'],
                ['JSON Formatter', '/json-formatter'],
                ['Base64 Encoder', '/base64-encoder'],
                ['UUID Generator', '/uuid-generator'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-3 text-sm mb-8">
              {[
                ['All Tools', '/tools'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
                ['Contact Us', '/contact'],
              ].map(([name, href]) => (
                <li key={href}><Link href={href} className="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{name}</Link></li>
              ))}
            </ul>

            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl border border-primary-100 dark:border-primary-800">
              <p className="text-xs text-primary-700 dark:text-primary-400 font-medium mb-1">📧 Support</p>
              <a href="mailto:mokshithnaik932@gmail.com" className="text-xs text-primary-600 hover:underline break-all">mokshithnaik932@gmail.com</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400 dark:text-gray-500">
          <p>&copy; {new Date().getFullYear()} PixMorph. All rights reserved. Designed for speed, built for privacy.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary-500 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary-500 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary-500 transition-colors">Contact</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
