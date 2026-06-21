import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Mail, Clock, MessageCircle, Github, Twitter, Instagram, HelpCircle, Bug, Lightbulb, Heart } from 'lucide-react'

export const metadata = {
  title: 'Contact Us | PixMorph',
  description: 'Get in touch with the PixMorph team. Email us for support, bug reports, or feature suggestions.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-brand-secondary py-20 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-white/80 leading-relaxed">
            We are always happy to hear from our users — whether it is a bug report, feature request, or just a kind word!
          </p>
        </div>
      </div>

      <Container className="py-20">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Main contact cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 flex flex-col items-center text-center hover:border-primary-400 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Email Support</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                Drop us an email and we'll get back to you as quickly as possible.
              </p>
              <a
                href="mailto:mokshithnaik932@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                <Mail className="w-4 h-4" />
                mokshithnaik932@gmail.com
              </a>
            </Card>

            <Card className="p-8 flex flex-col items-center text-center hover:border-blue-400 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Response Time</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                We aim to respond to all queries within 24 hours on business days.
              </p>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium">
                ⏱ Within 24 hours
              </span>
            </Card>

            <Card className="p-8 flex flex-col items-center text-center hover:border-green-400 hover:shadow-lg transition-all group">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Community</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 leading-relaxed">
                Follow us on social media for updates, tips, and new tool announcements.
              </p>
              <div className="flex gap-3">
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                  className="w-11 h-11 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center hover:bg-sky-200 transition-colors">
                  <Twitter className="w-4 h-4 text-sky-600" />
                </a>
                <a href="https://github.com/mokshith1222/PixMorph" target="_blank" rel="noopener noreferrer" aria-label="PixMorph GitHub Repository"
                  className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <Github className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                  className="w-11 h-11 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                  <Instagram className="w-4 h-4 text-pink-600" />
                </a>
              </div>
            </Card>
          </div>

          {/* Reasons to contact */}
          <div>
            <h2 className="text-3xl font-display font-bold text-center mb-10">How Can We Help?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Bug, title: 'Report a Bug', desc: 'Found something broken? Tell us exactly what happened, which tool you were using, and your browser/OS. We fix reported bugs as our top priority.', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
                { icon: Lightbulb, title: 'Suggest a Feature', desc: 'Have an idea for a new tool or an improvement? We actively build based on user feedback. Your suggestion might be our next feature!', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
                { icon: HelpCircle, title: 'General Support', desc: "Not sure how to use a tool? We're happy to walk you through any of our 70+ tools step by step so you get exactly what you need.", color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
              ].map(({ icon: Icon, title, desc, color, bg }) => (
                <div key={title} className={`${bg} p-6 rounded-2xl border border-transparent`}>
                  <Icon className={`w-8 h-8 ${color} mb-4`} />
                  <h3 className="text-lg font-bold mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Email CTA */}
          <div className="bg-gradient-to-r from-primary-600 to-brand-secondary p-10 rounded-3xl text-white text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Ready to Reach Out?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Send us an email and join the growing community of PixMorph users who help us build better tools every day.
            </p>
            <a
              href="mailto:mokshithnaik932@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold text-lg hover:bg-primary-50 transition-colors shadow-lg"
            >
              <Mail className="w-5 h-5" />
              mokshithnaik932@gmail.com
            </a>
          </div>

        </div>
      </Container>
    </div>
  )
}
