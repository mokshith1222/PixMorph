'use client'

import Link from 'next/link'
import { Logo } from './Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { Container } from '@/components/ui/Container'
import { Github } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between h-16">
          <Logo />
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/tools"
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              All Tools
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <ThemeToggle />
            <Link href="/tools">
              <button className="ml-2 px-5 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold transition-all shadow-lg shadow-primary-500/20 active:scale-95">
                Try Now
              </button>
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </nav>
  )
}
