import { Container } from '@/components/ui/Container'
import { FileText, CheckCircle, XCircle, Scale, Globe, RefreshCw, Mail, ShieldAlert } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service | PixMorph',
  description: 'Read the PixMorph Terms of Service. Free to use, no upload, no hidden costs.',
  alternates: { canonical: '/terms' },
}

const sections = [
  {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    title: '1. Acceptance of Terms',
    content: `By accessing or using any part of PixMorph ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, then you may not access the Service.\n\nThese Terms apply to all visitors, users, and others who access or use our tools. Please read them carefully before using the Service.`,
  },
  {
    icon: Globe,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    title: '2. Description of Service',
    content: `PixMorph provides a collection of browser-based file processing tools including but not limited to:\n\n• **Image tools**: Conversion, compression, resizing, cropping, color extraction, filters, and effects.\n• **Audio tools**: MP3/WAV conversion, trimming, compression, and volume adjustment.\n• **PDF tools**: Text extraction, image conversion, merging, splitting, and watermarking.\n• **Utility tools**: QR code generators, password generators, unit converters, and code formatters.\n\nAll tools are provided free of charge. No account or registration is required to use the Service.`,
  },
  {
    icon: CheckCircle,
    color: 'text-teal-600',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    title: '3. Permitted Use',
    content: `You are permitted to:\n\n• Use all tools for personal, educational, and commercial projects.\n• Process your own files or files you have legal rights to use.\n• Share the PixMorph website URL with others.\n• Use the Service from any country or jurisdiction where it is legally accessible.\n\nThere is no limit on the number of files you can process, and you do not need to create an account.`,
  },
  {
    icon: XCircle,
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-900/20',
    title: '4. Prohibited Use',
    content: `You agree NOT to use PixMorph to:\n\n• Process or distribute illegal, defamatory, or infringing content.\n• Attempt to reverse-engineer, scrape, or systematically harvest the Service.\n• Use automated bots or scripts to bulk-access the Service in a way that degrades performance for other users.\n• Circumvent any security features or technical restrictions.\n• Misrepresent the origin or ownership of files you process.\n\nViolation of these restrictions may result in access being blocked and, in serious cases, legal action.`,
  },
  {
    icon: ShieldAlert,
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    title: '5. Disclaimer of Warranties',
    content: `PixMorph is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied, including but not limited to:\n\n• Warranties of merchantability, fitness for a particular purpose, or non-infringement.\n• Guarantees that the Service will be uninterrupted, timely, secure, or error-free.\n• Accuracy or reliability of any output produced by the tools.\n\nYou use the Service entirely at your own risk. Always keep backups of important files before processing them with any online tool.`,
  },
  {
    icon: Scale,
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    title: '6. Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, PixMorph and its creators, contributors, or affiliates shall not be liable for:\n\n• Any direct, indirect, incidental, special, punitive, or consequential damages.\n• Loss of data, profits, goodwill, or business interruption.\n• Damages resulting from use or inability to use the Service.\n\nIn jurisdictions that do not allow the exclusion or limitation of liability for consequential or incidental damages, our liability is limited to the maximum extent permitted by law.`,
  },
  {
    icon: FileText,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    title: '7. Intellectual Property',
    content: `The PixMorph name, logo, design, and underlying technology are the intellectual property of PixMorph and its creators. You may not:\n\n• Copy, reproduce, or replicate the PixMorph brand or UI without written permission.\n• Claim ownership over any output that uses PixMorph's processing technology as the primary creative contribution.\n\nFiles you upload and process remain entirely your property. We make no claim over any content you process with our tools.`,
  },
  {
    icon: RefreshCw,
    color: 'text-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800',
    title: '8. Changes to Terms',
    content: `We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. The "Last Updated" date at the top of this page will reflect the date of the most recent revision.\n\nYour continued use of the Service after any changes indicates your acceptance of the new Terms. If you disagree with any updated terms, you should stop using the Service immediately.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-700 via-slate-800 to-gray-900 py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Scale className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            Simple rules for a fair and safe experience. Read before using PixMorph.
          </p>
          <p className="mt-4 text-white/40 text-sm">Last Updated: June 2025</p>
        </div>
      </div>

      <Container className="py-20">
        <div className="max-w-4xl mx-auto">

          {/* Quick Summary */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-12 flex gap-4">
            <FileText className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-1">The Simple Version</h2>
              <p className="text-blue-700 dark:text-blue-400">
                PixMorph is free to use for personal and commercial projects. Don't use it for illegal purposes or abuse the platform. Your files are yours — we never touch them. That's it.
              </p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(({ icon: Icon, color, bg, title, content }) => (
              <div key={title} className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className={`${bg} px-8 py-5 flex items-center gap-3 border-b border-gray-100 dark:border-gray-700`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                  <h2 className="text-xl font-bold">{title}</h2>
                </div>
                <div className="px-8 py-6">
                  {content.split('\n').map((line, i) => {
                    if (!line.trim()) return <br key={i} />
                    const parts = line.split(/(\*\*.*?\*\*)/g)
                    return (
                      <p key={i} className={`text-gray-600 dark:text-gray-400 leading-relaxed mb-1 ${line.startsWith('•') ? 'pl-2' : ''}`}>
                        {parts.map((part, j) =>
                          part.startsWith('**') && part.endsWith('**')
                            ? <strong key={j} className="text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gradient-to-r from-slate-700 to-slate-900 p-8 rounded-2xl text-white text-center">
            <Mail className="w-10 h-10 mx-auto mb-4 opacity-70" />
            <h2 className="text-2xl font-bold mb-2">Questions About These Terms?</h2>
            <p className="text-white/70 mb-6">
              If you have any legal questions or concerns, reach out and we will do our best to clarify.
            </p>
            <a
              href="mailto:mokshithnaik932@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-800 rounded-xl font-semibold hover:bg-slate-100 transition-colors"
            >
              <Mail className="w-4 h-4" />
              mokshithnaik932@gmail.com
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}
