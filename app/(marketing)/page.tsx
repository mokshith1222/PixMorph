import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import {
  Sparkles, ArrowRight, ShieldCheck, Zap, CloudOff, Image, Music, FileText, Wrench,
  ChevronRight, Star, Users, Globe
} from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    color: 'text-green-600',
    bg: 'bg-green-100 dark:bg-green-900/30',
    title: '100% Secure',
    desc: 'Your files never leave your device. All processing happens locally in your browser — technically impossible for us to see your data.',
  },
  {
    icon: Zap,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    title: 'Lightning Fast',
    desc: 'No upload wait times. Your file is processed instantly using your own device\'s power, not a slow remote server.',
  },
  {
    icon: CloudOff,
    color: 'text-purple-600',
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    title: 'Works Offline',
    desc: 'Once the page is loaded, many of our core tools work even without an active internet connection.',
  },
]

const toolCategories = [
  {
    icon: Image,
    color: 'from-pink-500 to-rose-500',
    title: 'Image Tools',
    count: '20+',
    examples: ['HEIC to JPG', 'Image Compressor', 'Image to Sketch', 'Color Extractor', 'Sepia Filter'],
    href: '/tools',
  },
  {
    icon: Music,
    color: 'from-violet-500 to-purple-600',
    title: 'Audio Tools',
    count: '5+',
    examples: ['Audio Trimmer', 'MP3 ↔ WAV', 'Volume Booster', 'Audio Compressor'],
    href: '/tools',
  },
  {
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
    title: 'PDF Tools',
    count: '10+',
    examples: ['PDF to JPG', 'PDF to Word', 'PDF Merger', 'PDF Splitter', 'PDF Compressor'],
    href: '/tools',
  },
  {
    icon: Wrench,
    color: 'from-amber-500 to-orange-500',
    title: 'Utility Tools',
    count: '10+',
    examples: ['QR Generator', 'Password Generator', 'JSON Formatter', 'UUID Generator'],
    href: '/tools',
  },
]

const stats = [
  { icon: Star, value: '70+', label: 'Free Tools' },
  { icon: Users, value: '100%', label: 'Private & Local' },
  { icon: Globe, value: '0', label: 'Uploads Required' },
  { icon: Zap, value: 'Free', label: 'Forever' },
]

const faqs = [
  {
    q: 'Is PixMorph really 100% free?',
    a: 'Yes! Every single one of our 70+ tools is completely free — no account, no subscription, no watermark, no file size limit. We believe powerful tools should be accessible to everyone.',
  },
  {
    q: 'How does browser-based processing work?',
    a: "Instead of uploading your file to a cloud server, we use modern browser APIs (Canvas API, Web Audio API, WebAssembly) to process files directly on your device. Think of it like running software on your computer — except it's all happening inside your browser tab.",
  },
  {
    q: 'Are my files safe and private?',
    a: 'Absolutely. Since all processing is local, your files are never transmitted to any server. We have no technical capability to access them. This is the most privacy-preserving approach possible.',
  },
  {
    q: 'What image formats does PixMorph support?',
    a: 'We support JPG, PNG, WebP, AVIF, HEIC, GIF, BMP, and SVG across our image tools. Audio tools support MP3, WAV, OGG, and M4A. PDF tools work with all standard PDF files.',
  },
  {
    q: 'Is there a file size limit?',
    a: "Since processing happens in your browser, the limit is only your device's available RAM. Modern devices can comfortably handle files up to several gigabytes.",
  },
  {
    q: 'Can I use PixMorph on my phone or tablet?',
    a: 'Yes! PixMorph is fully responsive and works on all devices — smartphones, tablets, and desktops. The tools are optimized for both touch and mouse/keyboard interaction.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-primary-950 to-slate-900 text-white">
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl" />

        <Container className="relative py-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>70+ Free Online Tools — No Account Needed</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-primary-200 to-brand-secondary bg-clip-text text-transparent">
              Transform
            </span>
            <br />
            <span className="text-white/90">Any File, Instantly.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            Convert, compress, edit, and enhance images, audio, PDFs, and more.
            All processing happens <strong className="text-white/90">in your browser</strong> — private, fast, and completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/tools"
              className="inline-flex items-center gap-2 px-10 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary-900/50 hover:shadow-primary-900/70 hover:-translate-y-0.5">
              Browse All 70+ Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/image-to-sketch"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-medium text-lg transition-all backdrop-blur-sm">
              Try Image to Sketch
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white">{value}</span>
                <span className="text-sm text-white/50 mt-1">{label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Why Millions Choose PixMorph</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Built differently from other online tools — your privacy comes first, always.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* TOOL CATEGORIES */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Everything You Need In One Place</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              From everyday image conversions to advanced PDF manipulation — we have a tool for it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map(({ icon: Icon, color, title, count, examples, href }) => (
              <Link key={title} href={href} className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className={`bg-gradient-to-br ${color} p-6`}>
                  <Icon className="w-10 h-10 text-white mb-3" />
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <span className="text-white/70 text-sm">{count} tools available</span>
                </div>
                <div className="p-5">
                  <ul className="space-y-2">
                    {examples.map(ex => (
                      <li key={ex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ChevronRight className="w-3 h-3 text-primary-500 flex-shrink-0" />
                        {ex}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-1 text-primary-600 text-sm font-medium group-hover:gap-2 transition-all">
                    View all tools <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              See All 70+ Tools
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Everything you need to know about PixMorph.
              </p>
            </div>
            <div className="space-y-4">
              {faqs.map(({ q, a }, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-7 hover:shadow-sm transition-shadow">
                  <h3 className="text-lg font-bold mb-3 flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-900/40 text-primary-600 rounded-lg flex items-center justify-center text-sm font-bold">{i + 1}</span>
                    {q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed pl-10">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA BANNER */}
      <section className="py-24">
        <Container>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-brand-secondary rounded-3xl p-12 text-white text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6">Ready to Get Started?</h2>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
                Join thousands of users who trust PixMorph for their everyday file transformation needs. No sign up. No payment. Just powerful tools.
              </p>
              <Link href="/tools"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary-600 rounded-2xl font-extrabold text-xl hover:bg-primary-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                <Sparkles className="w-6 h-6" />
                Explore All Free Tools
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
