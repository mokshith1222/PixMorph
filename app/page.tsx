'use client'

import React from 'react'
import { Container } from '@/components/ui/Container'
import Link from 'next/link'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Image as ImageIcon, 
  Music, 
  FileText, 
  Code2,
  Sparkles,
  Lock,
  Cpu,
  Star,
  Layers,
  PlaySquare,
  Globe2,
  Palette
} from 'lucide-react'
import { TOOLS } from '@/lib/constants'

const MarqueeRow = ({ items, reverse = false }: { items: any[], reverse?: boolean }) => {
  return (
    <div className="flex w-full overflow-hidden select-none group relative">
      {/* Fallback to CSS animations instead of Framer Motion for perfect stability */}
      <div className={`flex gap-4 min-w-max items-center pr-4 group-hover:[animation-play-state:paused] ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {[...items, ...items].map((tool, i) => (
          <div key={`${tool.name}-${i}`} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 dark:bg-gray-800/40 border border-black/5 dark:border-white/5 backdrop-blur-md whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm hover:scale-105 transition-transform hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-primary-500/50" />
            {tool.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  const allTools = TOOLS;
  const half = Math.ceil(allTools.length / 2);
  const topRow = allTools.slice(0, half);
  const bottomRow = allTools.slice(half);

  const categories = [
    {
      title: 'Image Alchemy',
      description: 'Compress, convert, upscale, and transform images with zero server uploads.',
      icon: <ImageIcon className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      shadow: 'shadow-blue-500/20',
      href: '/tools#image',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Audio Studio',
      description: 'Trim, boost, and mix tracks locally with WASM.',
      icon: <Music className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      shadow: 'shadow-purple-500/20',
      href: '/tools#audio',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Video Engine',
      description: 'Crop, compress, and stabilize video flawlessly.',
      icon: <PlaySquare className="w-8 h-8" />,
      color: 'from-rose-500 to-orange-500',
      shadow: 'shadow-rose-500/20',
      href: '/tools#video',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'PDF Utilities',
      description: 'Merge, split, compress and securely sign documents.',
      icon: <FileText className="w-8 h-8" />,
      color: 'from-red-500 to-rose-400',
      shadow: 'shadow-red-500/20',
      href: '/tools#pdf',
      colSpan: 'md:col-span-2',
    },
    {
      title: 'Power Dev Tools',
      description: 'Minifiers, formatters, Base64, UUIDs and more.',
      icon: <Code2 className="w-8 h-8" />,
      color: 'from-emerald-500 to-teal-400',
      shadow: 'shadow-emerald-500/20',
      href: '/tools#utility',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Network Intelligence',
      description: 'Instant DNS Lookups and Domain Age checks.',
      icon: <Globe2 className="w-8 h-8" />,
      color: 'from-indigo-500 to-blue-500',
      shadow: 'shadow-indigo-500/20',
      href: '/tools#network',
      colSpan: 'md:col-span-1',
    },
    {
      title: 'Design Makers',
      description: 'Generate Logos, Icons, Banners, Posters and Resumes.',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-400',
      shadow: 'shadow-pink-500/20',
      href: '/tools#design',
      colSpan: 'md:col-span-1',
    }
  ]

  return (
    <div className="flex flex-col gap-24 pb-20 overflow-hidden bg-[#fafafa] dark:bg-[#0a0a0a]">
      {/* Background Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 blur-[120px] dark:bg-primary-500/20 mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[8000ms]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px] dark:bg-purple-500/20 mix-blend-multiply dark:mix-blend-screen animate-pulse duration-[10000ms]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <Container>
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-md mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Introducing 100+ Local First Tools
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-8">
              Transform Files <br />
              <span className="relative inline-block mt-2">
                <span className="absolute -inset-2 bg-gradient-to-r from-primary-500 to-purple-500 blur-2xl opacity-20 rounded-full" />
                <span className="relative bg-gradient-to-r from-primary-600 to-purple-500 bg-clip-text text-transparent">
                  At Near-Native Speed
                </span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-12 font-medium">
              Image conversion, audio trimming, video stabilization, and PDF editing. Zero server uploads. Infinite privacy. Fully powered by your browser's WebAssembly.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
              <Link href="/tools" className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
                <div className="relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold transition-all flex items-center justify-center gap-3 active:scale-95 text-lg">
                  Explore The Suite
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <a href="https://github.com/mokshith1222/PixMorph" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white font-bold hover:bg-white/80 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95 text-lg shadow-sm">
                <Star className="w-6 h-6 fill-gray-900 dark:fill-white" />
                Star on GitHub
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Infinite Tool Marquee */}
      <section className="py-10 border-y border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 backdrop-blur-sm overflow-hidden flex flex-col gap-6 animate-fade-in [animation-delay:500ms]">
        <MarqueeRow items={topRow} />
        <MarqueeRow items={bottomRow} reverse />
      </section>

      {/* Bento Grid Features */}
      <section className="py-16">
        <Container>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">The Ultimate Bento Box</h2>
            <p className="text-xl text-gray-500 dark:text-gray-400">Professional toolkits crafted into an elegant interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className={`${cat.colSpan} relative group animate-slide-up`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <Link href={cat.href} className="block w-full h-full">
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 rounded-[24px] transition-opacity duration-500`} />
                  <div className="w-full h-full p-6 rounded-[24px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors shadow-sm overflow-hidden relative flex flex-col justify-end group-hover:-translate-y-1 duration-300">
                    
                    {/* Background Icon Watermark */}
                    <div className="absolute -right-6 -top-6 opacity-5 dark:opacity-[0.03] transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700">
                      {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-48 h-48' })}
                    </div>

                    <div className="relative z-10">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} ${cat.shadow} shadow-lg text-white flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                        {React.cloneElement(cat.icon as React.ReactElement, { className: 'w-6 h-6' })}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2 tracking-tight text-gray-900 dark:text-white">{cat.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{cat.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Deep Dive */}
      <section className="py-24 relative overflow-hidden">
        <Container>
          <div className="bg-gray-900 rounded-[48px] p-10 md:p-20 relative overflow-hidden shadow-2xl">
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50 pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/30 blur-[128px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8">
                  <Lock className="w-4 h-4" /> Client-Side First
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-8">
                  Your files stay on <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">your machine.</span>
                </h2>
                
                <div className="space-y-8">
                  {[
                    { icon: <Cpu />, title: "WebAssembly Accelerated", desc: "We compile C++ and Rust engines (like FFmpeg and OpenCV) to run directly in your browser." },
                    { icon: <Zap />, title: "Zero Upload Latency", desc: "No more waiting for files to upload to a remote server. Processing begins the millisecond you drop the file." },
                    { icon: <Shield />, title: "Cryptographic Privacy", desc: "By design, it is impossible for us to see, store, or share your data. The server only delivers the app UI." }
                  ].map((feature, i) => (
                    <div 
                      key={i} 
                      className="flex gap-6 animate-slide-up"
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive Visual Element */}
              <div className="hidden lg:flex items-center justify-center relative">
                <div className="absolute w-[300px] h-[300px] rounded-full border border-white/10 border-dashed animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[200px] h-[200px] rounded-full border border-primary-500/20 animate-[spin_30s_linear_infinite_reverse]" />
                
                <div className="w-40 h-40 bg-gray-800 rounded-3xl border border-white/10 shadow-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white space-y-4">
                     <Layers className="w-10 h-10 text-primary-400 animate-bounce" />
                     <span className="font-mono text-[10px] tracking-widest text-primary-300 uppercase font-bold">WASM Engine Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-black/5 dark:border-white/5">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Active Tools", value: "100+" },
              { label: "Server Uploads", value: "0" },
              { label: "Cost", value: "Free" },
              { label: "Open Source", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 rounded-3xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <div className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500 mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  )
}