import { Container } from '@/components/ui/Container'
import { Shield, Eye, Database, Lock, Globe, Mail, UserCheck, RefreshCw } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy | PixMorph',
  description: 'Read how PixMorph handles your data. Your files never leave your device — all processing is local.',
}

const sections = [
  {
    icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    title: '1. What Data We Collect',
    content: `We collect minimal, anonymized data to improve PixMorph:\n\n• **Usage analytics**: Which tools are used, how often, and general geographic region (country-level only) via anonymized analytics.\n• **No personal information** is collected unless you voluntarily contact us via email.\n• **No file data**: We never see, store, or process any of the files you use with our tools.\n• **Cookies**: We may use functional cookies for theme preferences (light/dark mode) and session data.`,
  },
  {
    icon: Lock,
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    title: '2. Local Processing — Your Files Stay Private',
    content: `This is the most important section of our privacy policy.\n\n**All file processing on PixMorph happens 100% locally inside your web browser.** When you drop an image, audio file, or PDF into any of our tools:\n\n• The file is **never uploaded** to any server.\n• The file is **never transmitted** over the internet.\n• The file is processed using your device's own CPU/GPU via browser APIs (Canvas API, Web Audio API, WebAssembly, etc.).\n• Once you close the tab, **nothing is retained**.\n\nThis design means our privacy guarantee is technically enforced — even if we wanted to see your files, we architecturally cannot.`,
  },
  {
    icon: Database,
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    title: '3. Third-Party Services',
    content: `We may use the following third-party services which have their own privacy policies:\n\n• **Google Analytics** (anonymized): Used to understand which tools are popular so we can prioritize improvements. IP anonymization is enabled.\n• **Google Fonts**: Typography served via Google CDN.\n• **Cloudflare** (if applicable): For CDN and DDoS protection, which may log anonymized IP metadata.\n\nWe do **not** use advertising networks, tracking pixels, or sell data to any third party.`,
  },
  {
    icon: UserCheck,
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    title: '4. Your Rights',
    content: `Depending on your jurisdiction, you may have the following rights:\n\n• **Right to access**: Request what data we hold about you.\n• **Right to deletion**: Request removal of any personal data.\n• **Right to opt out**: You can disable analytics cookies via your browser settings at any time.\n• **GDPR compliance**: Users in the EU/EEA may contact us for a data subject access request.\n\nSince we collect no personally identifiable information, exercising these rights is typically straightforward.`,
  },
  {
    icon: Globe,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    title: '5. International Users',
    content: `PixMorph is accessible worldwide. Since file processing happens on your device, there is no cross-border transfer of file data.\n\nAny anonymized analytics data is processed in accordance with applicable data protection regulations including GDPR (EU), CCPA (California), and other regional laws.`,
  },
  {
    icon: RefreshCw,
    color: 'text-gray-600',
    bg: 'bg-gray-50 dark:bg-gray-800',
    title: '6. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time to reflect new tools, legal requirements, or improvements. The "Last Updated" date at the top of this page will always reflect the most recent version.\n\nFor significant changes, we will post a notice on our home page. We encourage you to review this policy periodically.`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            Your privacy is fundamental to how we built PixMorph. Your files never leave your device.
          </p>
          <p className="mt-4 text-white/60 text-sm">Last Updated: June 2025</p>
        </div>
      </div>

      <Container className="py-20">
        <div className="max-w-4xl mx-auto">
          {/* Privacy highlight banner */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6 mb-12 flex gap-4">
            <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-bold text-green-800 dark:text-green-300 mb-1">The Short Version</h2>
              <p className="text-green-700 dark:text-green-400">
                All of our tools process your files locally inside your browser. <strong>We never upload, store, or view your files.</strong> Full stop. Read on for the complete details.
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

          {/* Contact */}
          <div className="mt-12 bg-gradient-to-r from-primary-600 to-brand-secondary p-8 rounded-2xl text-white text-center">
            <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
            <h2 className="text-2xl font-bold mb-2">Privacy Questions?</h2>
            <p className="text-white/80 mb-6">
              If you have any questions or concerns about our privacy practices, please reach out.
            </p>
            <a
              href="mailto:mokshithnaik932@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
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
