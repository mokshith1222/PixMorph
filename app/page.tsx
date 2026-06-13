'use client'

import { Container } from '@/components/ui/Container'
import Link from 'next/link'
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Image as ImageIcon, 
  Music, 
  FileText, 
  Settings,
  Sparkles,
  Globe,
  MousePointer2,
  Cpu,
  Lock,
  ChevronDown,
  CheckCircle2,
  HardDrive,
  Code2,
  Star
} from 'lucide-react'

export default function HomePage() {
  const categories = [
    {
      title: 'Image Tools',
      description: 'Compress, convert, and transform images instantly.',
      icon: <ImageIcon className="w-6 h-6" />,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      href: '/tools#image'
    },
    {
      title: 'Audio Tools',
      description: 'Trim, boost, and convert audio files locally.',
      icon: <Music className="w-6 h-6" />,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      href: '/tools#audio'
    },
    {
      title: 'PDF Utilities',
      description: 'The easiest way to merge, compress and convert PDFs.',
      icon: <FileText className="w-6 h-6" />,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      href: '/tools#pdf'
    },
    {
      title: 'Power Tools',
      description: 'QR generators, password security, and formatting.',
      icon: <Settings className="w-6 h-6" />,
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      href: '/tools#utility'
    }
  ]

  return (
    <div className="flex flex-col gap-32 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full -z-10 opacity-50" />
        
        <Container>
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-xs font-bold mb-8 transition-transform hover:scale-105 cursor-default">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Browser-Based & Secure</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-8">
              Modern tools for <br />
              <span className="bg-gradient-to-r from-primary-600 to-brand-secondary bg-clip-text text-transparent">
                digital transformation
              </span>
            </h1>
            
            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed mb-12">
              70+ high-performance tools for images, audio, and documents. No server uploads—just pure privacy and speed right in your browser.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/tools" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2 group active:scale-95">
                Explore All Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2 active:scale-95">
                Star on GitHub
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 pt-12 border-t border-gray-100 dark:border-gray-800 w-full opacity-80">
               <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500"><Zap className="w-6 h-6" /></div>
                  <span className="text-sm font-bold">Instant Processing</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500"><Shield className="w-6 h-6" /></div>
                  <span className="text-sm font-bold">Maximum Privacy</span>
               </div>
               <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1">
                  <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500"><Globe className="w-6 h-6" /></div>
                  <span className="text-sm font-bold">Client-Side Tech</span>
               </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Stats Bar */}
      <section className="-mt-12">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Free Tools", value: "70+", sub: "No hidden costs" },
              { label: "Processing", value: "100%", sub: "Local & Private" },
              { label: "File Uploads", value: "0", sub: "Data never leaves" },
              { label: "Support", value: "24/7", sub: "Community driven" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center shadow-sm">
                <div className="text-3xl font-display font-bold text-primary-600 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories Grid */}
      <section>
        <Container>
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Powerful Toolkits</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl">Everything you need to manage your media, built for the modern web.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.title} 
                href={cat.href}
                className="group p-8 rounded-[32px] bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500/50 dark:hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/5 transition-all flex flex-col items-center text-center"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">{cat.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Tools Spotlight - Deep Dive for SEO/AdSense */}
      <section className="py-12 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-8">Professional Grade Processing, Right in Your Browser</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 text-primary-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Smart Image Compression</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Our compression algorithms use intelligent lossy and lossless techniques to reduce file sizes by up to 90% while maintaining stunning visual quality for WebP, PNG, and JPEG.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 text-primary-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Millisecond-Precision Audio Tools</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Trim, convert, and boost audio with professional accuracy. We support high-fidelity formats like WAV, MP3, and OGG without any quality degradation during the conversion process.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1 text-primary-500"><CheckCircle2 className="w-6 h-6" /></div>
                  <div>
                    <h4 className="font-bold text-lg">Unified PDF Management</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">Merge multiple documents, extract specific pages, or compress heavy PDFs for email. All document structural integrity is preserved perfectly.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-primary-500/20 blur-[100px] rounded-full" />
              <div className="relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[32px] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs font-mono text-gray-400">pixmorph-processor.wasm</div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                  <div className="h-32 w-full bg-primary-500/5 border border-primary-500/10 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-8 h-8 text-primary-500 mx-auto mb-2 animate-bounce" />
                      <span className="text-xs font-bold uppercase tracking-widest text-primary-600">Processing Local Data...</span>
                    </div>
                  </div>
                  <div className="h-4 w-1/2 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Choose PixMorph? */}
      <section className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Why Choose PixMorph?</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Discover the advantages of using our privacy-first, high-performance tools for all your digital needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unmatched Privacy</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Your data stays on your device. All processing happens locally in your browser, ensuring your sensitive files never touch our servers.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Blazing Fast Performance</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Experience instant results. By leveraging your device's power, our tools deliver unparalleled speed without waiting for uploads or downloads.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Completely Free & Accessible</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Access a wide array of powerful tools at no cost. PixMorph is designed to be accessible to everyone, everywhere, with just a browser.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Technical Insight Section - High value for AdSense approval */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-orange-500/10 text-orange-500">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold">WebAssembly Powered</h4>
              <p className="text-sm text-gray-500 leading-relaxed">We use Wasm to run heavy C++ and Rust code inside your browser at near-native speeds.</p>
            </div>
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-500">
                <HardDrive className="w-6 h-6" />
              </div>
              <h4 className="font-bold">Zero Latency</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Since files are processed locally, there is no upload wait time, even for multi-gigabyte files.</p>
            </div>
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-purple-500/10 text-purple-500">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold">Hardware Acceleration</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Our tools leverage your device's GPU and multi-core CPU for lightning-fast transformation.</p>
            </div>
            <div className="space-y-4">
              <div className="p-3 w-fit rounded-2xl bg-emerald-500/10 text-emerald-500">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-bold">Always Improving</h4>
              <p className="text-sm text-gray-500 leading-relaxed">New tools are added weekly based on community requests and emerging web standards.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* How it Works */}
      <section className="relative py-12">
        <Container>
          <div className="bg-gray-900 dark:bg-gray-800/50 rounded-[48px] p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px] -mr-32 -mt-32" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">How PixMorph works</h2>
                <p className="text-gray-400 text-lg mb-10">We've reimagined online tools. Instead of sending your data to us, we send our tools to your browser.</p>
                
                <div className="space-y-8">
                  {[
                    { icon: <MousePointer2 />, title: "Select a Tool", desc: "Choose from our wide range of image, audio, or PDF utilities." },
                    { icon: <Cpu />, title: "Local Processing", desc: "Your device's CPU/GPU does the work. No files are uploaded to our servers." },
                    { icon: <Lock />, title: "Secure Download", desc: "Save your processed files instantly. Fast, private, and 100% secure." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center border border-primary-500/30">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden lg:block relative">
                <div className="aspect-square bg-gradient-to-br from-primary-500/20 to-brand-secondary/20 rounded-full border border-white/5 flex items-center justify-center p-12">
                   <div className="w-full h-full bg-gray-900 rounded-[32px] border border-white/10 shadow-2xl flex items-center justify-center">
                      <Sparkles className="w-24 h-24 text-primary-500 opacity-20" />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQs Section */}
      <section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500">Everything you need to know about PixMorph and our privacy-first approach.</p>
            </div>
            
            <div className="grid gap-4">
              {[
                { 
                  q: "Is PixMorph really free?", 
                  a: "Yes! PixMorph is 100% free to use. We maintain the site through unobtrusive ads and open-source contributions. There are no hidden fees or premium tiers." 
                },
                { 
                  q: "Are my files uploaded to your servers?", 
                  a: "No. Unlike other online converters, PixMorph uses client-side technology. All processing happens locally in your browser's memory. Your files never leave your computer." 
                },
                { 
                  q: "Is there a limit on file size?", 
                  a: "Because processing happens on your device, the limit depends on your system's RAM and browser capabilities. Generally, we support large files that traditional server-based tools would reject." 
                },
                { 
                  q: "Which browsers are supported?", 
                  a: "PixMorph works best on modern browsers like Chrome, Firefox, Edge, and Safari. We leverage WebAssembly and modern JS APIs for high-performance processing." 
                }
              ].map((faq, i) => (
                <div key={i} className="group p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500/30 transition-all">
                  <div className="flex items-center justify-between mb-3 cursor-default">
                    <h3 className="text-lg font-bold group-hover:text-primary-600 transition-colors">{faq.q}</h3>
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-all" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* About Section for AdSense/SEO */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-6">About PixMorph</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                PixMorph is a comprehensive, privacy-focused platform offering a suite of over 70 high-performance digital tools. 
                Our mission is to provide professional-grade media processing capabilities directly in your web browser, 
                eliminating the need for expensive software or server-side uploads.
              </p>
              <p>
                What sets PixMorph apart is our commitment to <strong>Client-Side Processing</strong>. Unlike traditional online tools 
                that require you to upload your sensitive images, audio files, or documents to a remote server, PixMorph 
                executes all operations locally on your device. This ensures maximum speed and absolute privacy—your data 
                never leaves your computer.
              </p>
              <p>
                Whether you are looking to compress images for web performance, trim audio for a podcast, or manage PDF 
                documents, PixMorph provides a seamless, ad-supported experience that is completely free to use. 
                Our tools are optimized for all modern browsers and designed to make your digital workflow more efficient.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}