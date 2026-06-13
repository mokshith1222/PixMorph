import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-primary-500 to-brand-secondary group-hover:scale-105 transition-transform">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-display font-bold bg-gradient-to-r from-primary-600 to-brand-secondary bg-clip-text text-transparent">
        PixMorph
      </span>
    </Link>
  )
}
