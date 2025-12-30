'use client'

import { useState } from 'react'

export default function InfluencerSearch() {
  const [formData, setFormData] = useState({
    niche: '',
    platform: 'instagram',
    minFollowers: '',
    maxFollowers: '',
    location: '',
    engagement: 'any'
  })
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/search-influencers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setResults(data.results || [])
    } catch (error) {
      console.error('Search error:', error)
      alert('Failed to search influencers. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Find Your Perfect Influencers</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Niche / Industry *
            </label>
            <input
              type="text"
              required
              value={formData.niche}
              onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
              placeholder="e.g., fitness, beauty, tech"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Platform *
            </label>
            <select
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="instagram">Instagram</option>
              <option value="youtube">YouTube</option>
              <option value="tiktok">TikTok</option>
              <option value="twitter">Twitter/X</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Min Followers
            </label>
            <input
              type="number"
              value={formData.minFollowers}
              onChange={(e) => setFormData({ ...formData, minFollowers: e.target.value })}
              placeholder="10000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Max Followers
            </label>
            <input
              type="number"
              value={formData.maxFollowers}
              onChange={(e) => setFormData({ ...formData, maxFollowers: e.target.value })}
              placeholder="500000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Location (optional)
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., United States, UK"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Engagement Rate
            </label>
            <select
              value={formData.engagement}
              onChange={(e) => setFormData({ ...formData, engagement: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="any">Any</option>
              <option value="high">High (&gt; 5%)</option>
              <option value="medium">Medium (2-5%)</option>
              <option value="low">Low (&lt; 2%)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : '🔍 Search Influencers'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((influencer, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{influencer.name}</h4>
                    <p className="text-sm text-gray-600">@{influencer.handle}</p>
                  </div>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {influencer.platform}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-700"><span className="font-semibold">Followers:</span> {influencer.followers.toLocaleString()}</p>
                  <p className="text-gray-700"><span className="font-semibold">Engagement:</span> {influencer.engagement}%</p>
                  <p className="text-gray-700"><span className="font-semibold">Niche:</span> {influencer.niche}</p>
                  {influencer.location && (
                    <p className="text-gray-700"><span className="font-semibold">Location:</span> {influencer.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
