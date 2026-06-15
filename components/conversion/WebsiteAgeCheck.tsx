'use client'
import React, { useState } from 'react'
import { Search, Globe, Calendar, AlertCircle } from 'lucide-react'

export function WebsiteAgeCheck() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkAge = async () => {
    if(!domain) return
    let target = domain.replace(/^https?:\/\//, '').split('/')[0]
    setLoading(true)
    setError('')
    setResult(null)
    try {
        const res = await fetch(`https://networkcalc.com/api/dns/whois/${target}`)
        const data = await res.json()
        if (data.status === 'OK' && data.whois && data.whois.creation_date) {
            setResult({
                created: new Date(data.whois.creation_date).toLocaleDateString(),
                updated: data.whois.updated_date ? new Date(data.whois.updated_date).toLocaleDateString() : 'N/A',
                expires: data.whois.registrar_registration_expiration_date ? new Date(data.whois.registrar_registration_expiration_date).toLocaleDateString() : 'N/A',
                registrar: data.whois.registrar || 'N/A'
            })
        } else {
            setError('Could not retrieve whois data for this domain.')
        }
    } catch(e) {
        setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Calendar className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Website Age Checker</h2>
        <p className="text-gray-500 dark:text-gray-400">Find out when a website was registered and its age.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAge()}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-gray-800 dark:text-gray-200 shadow-sm transition-all"
              placeholder="example.com"
            />
        </div>
        <button 
          onClick={checkAge} 
          disabled={loading}
          className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          Check
        </button>
      </div>

      {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" /> {error}
          </div>
      )}

      {result && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-scale-in">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Creation Date</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.created}</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Expiration Date</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.expires}</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Last Updated</div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.updated}</div>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Registrar</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white truncate" title={result.registrar}>{result.registrar}</div>
              </div>
          </div>
      )}
    </div>
  )
}
