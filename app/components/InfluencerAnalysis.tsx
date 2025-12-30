'use client'

import { useState } from 'react'

export default function InfluencerAnalysis() {
  const [url, setUrl] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/analyze-influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await response.json()
      setAnalysis(data)
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Failed to analyze influencer. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Deep Influencer Analysis</h2>

      <form onSubmit={handleAnalyze} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Influencer Profile URL *
          </label>
          <input
            type="url"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://instagram.com/username or https://youtube.com/@channel"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-2">
            Enter the full URL of an Instagram, YouTube, or TikTok profile
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analyzing...' : '📊 Analyze Influencer'}
        </button>
      </form>

      {analysis && (
        <div className="mt-8 space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{analysis.name}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Followers</p>
                <p className="text-2xl font-bold text-indigo-600">{analysis.followers?.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-purple-600">{analysis.engagement}%</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Avg Views</p>
                <p className="text-2xl font-bold text-pink-600">{analysis.avgViews?.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">Posts</p>
                <p className="text-2xl font-bold text-indigo-600">{analysis.totalPosts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Content Strategy</h4>
            <p className="text-gray-700 mb-4">{analysis.contentStrategy}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Top Content Themes:</p>
                <ul className="space-y-1">
                  {analysis.contentThemes?.map((theme: string, idx: number) => (
                    <li key={idx} className="text-gray-600">• {theme}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Posting Schedule:</p>
                <p className="text-gray-600">{analysis.postingFrequency}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Audience Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Demographics:</p>
                <p className="text-gray-600">{analysis.audienceDemographics}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Top Locations:</p>
                <p className="text-gray-600">{analysis.audienceLocations}</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 mb-2">Interests:</p>
                <p className="text-gray-600">{analysis.audienceInterests}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Brand Collaboration Fit</h4>
            <p className="text-gray-700 mb-4">{analysis.brandFit}</p>
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <p className="font-semibold text-green-800 mb-2">Recommended Approach:</p>
              <p className="text-green-700">{analysis.recommendedApproach}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-xl font-bold mb-3 text-gray-800">Recent Performance</h4>
            <div className="space-y-3">
              {analysis.recentPosts?.map((post: any, idx: number) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-1">{post.title}</p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>❤️ {post.likes?.toLocaleString()}</span>
                    <span>💬 {post.comments?.toLocaleString()}</span>
                    <span>👁️ {post.views?.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
