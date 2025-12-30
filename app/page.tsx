'use client'

import { useState } from 'react'
import InfluencerSearch from './components/InfluencerSearch'
import InfluencerAnalysis from './components/InfluencerAnalysis'
import OutreachGenerator from './components/OutreachGenerator'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'analyze' | 'outreach'>('search')

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Influencer Outreach Agent
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Find the perfect influencers, analyze them deeply, and craft personalized outreach messages that convert
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('search')}
                className={`flex-1 py-4 px-6 font-semibold transition-all ${
                  activeTab === 'search'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                🔍 Find Influencers
              </button>
              <button
                onClick={() => setActiveTab('analyze')}
                className={`flex-1 py-4 px-6 font-semibold transition-all ${
                  activeTab === 'analyze'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                📊 Deep Analysis
              </button>
              <button
                onClick={() => setActiveTab('outreach')}
                className={`flex-1 py-4 px-6 font-semibold transition-all ${
                  activeTab === 'outreach'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                ✉️ Generate Outreach
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'search' && <InfluencerSearch />}
              {activeTab === 'analyze' && <InfluencerAnalysis />}
              {activeTab === 'outreach' && <OutreachGenerator />}
            </div>
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>Powered by AI • Professional Influencer Marketing at Scale</p>
        </footer>
      </div>
    </main>
  )
}
