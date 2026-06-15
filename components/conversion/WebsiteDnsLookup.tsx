'use client'
import React, { useState } from 'react'
import { Search, Globe, AlertCircle, Server } from 'lucide-react'

export function WebsiteDnsLookup() {
  const [domain, setDomain] = useState('')
  const [records, setRecords] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const checkDns = async () => {
    if(!domain) return
    let target = domain.replace(/^https?:\/\//, '').split('/')[0]
    setLoading(true)
    setError('')
    setRecords(null)
    try {
        const res = await fetch(`https://networkcalc.com/api/dns/lookup/${target}`)
        const data = await res.json()
        if (data.status === 'OK' && data.records) {
            setRecords(data.records)
        } else {
            setError('Could not retrieve DNS records.')
        }
    } catch(e) {
        setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-10">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            <Server className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">DNS Records Lookup</h2>
        <p className="text-gray-500 dark:text-gray-400">Find A, AAAA, MX, NS, TXT, and SOA records for any domain.</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkDns()}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 outline-none text-gray-800 dark:text-gray-200 shadow-sm transition-all"
              placeholder="example.com"
            />
        </div>
        <button 
          onClick={checkDns} 
          disabled={loading}
          className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Search className="w-5 h-5" />}
          Lookup
        </button>
      </div>

      {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5" /> {error}
          </div>
      )}

      {records && (
          <div className="space-y-6 animate-scale-in">
              {Object.keys(records).map(type => {
                  if(!records[type] || records[type].length === 0) return null;
                  return (
                      <div key={type} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                              <h3 className="font-bold text-gray-900 dark:text-white">{type} Records</h3>
                          </div>
                          <div className="p-6">
                              <ul className="space-y-3 font-mono text-sm">
                                  {records[type].map((rec: any, i: number) => (
                                      <li key={i} className="flex flex-wrap gap-4 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                          {typeof rec === 'string' ? (
                                              <span>{rec}</span>
                                          ) : (
                                              Object.entries(rec).map(([k, v]) => (
                                                  <div key={k} className="flex gap-2">
                                                      <span className="text-gray-500">{k}:</span>
                                                      <span className="font-medium text-gray-900 dark:text-gray-100">{String(v)}</span>
                                                  </div>
                                              ))
                                          )}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  )
              })}
          </div>
      )}
    </div>
  )
}
