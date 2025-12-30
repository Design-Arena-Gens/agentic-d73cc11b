'use client'

import { useState } from 'react'

export default function OutreachGenerator() {
  const [formData, setFormData] = useState({
    influencerName: '',
    influencerHandle: '',
    platform: 'instagram',
    brandName: '',
    productDescription: '',
    campaignGoal: '',
    budget: '',
    contentDetails: '',
    tone: 'professional-friendly'
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate outreach message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message)
    alert('Message copied to clipboard!')
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Generate Personalized Outreach</h2>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Influencer Name *
            </label>
            <input
              type="text"
              required
              value={formData.influencerName}
              onChange={(e) => setFormData({ ...formData, influencerName: e.target.value })}
              placeholder="Sarah Johnson"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Influencer Handle *
            </label>
            <input
              type="text"
              required
              value={formData.influencerHandle}
              onChange={(e) => setFormData({ ...formData, influencerHandle: e.target.value })}
              placeholder="@sarahjohnson"
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
              Your Brand Name *
            </label>
            <input
              type="text"
              required
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              placeholder="FitLife Supplements"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product/Service Description *
            </label>
            <textarea
              required
              value={formData.productDescription}
              onChange={(e) => setFormData({ ...formData, productDescription: e.target.value })}
              placeholder="Premium plant-based protein powder designed for athletes and fitness enthusiasts"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Campaign Goal *
            </label>
            <textarea
              required
              value={formData.campaignGoal}
              onChange={(e) => setFormData({ ...formData, campaignGoal: e.target.value })}
              placeholder="Increase brand awareness among fitness-focused millennials and drive traffic to our new product line"
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Budget Range (optional)
            </label>
            <input
              type="text"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              placeholder="$2,000 - $5,000"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message Tone *
            </label>
            <select
              value={formData.tone}
              onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="professional-friendly">Professional & Friendly</option>
              <option value="casual">Casual & Conversational</option>
              <option value="enthusiastic">Enthusiastic & Energetic</option>
              <option value="formal">Formal & Corporate</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Specific Content Ideas or Details (optional)
            </label>
            <textarea
              value={formData.contentDetails}
              onChange={(e) => setFormData({ ...formData, contentDetails: e.target.value })}
              placeholder="We'd love 3 Instagram Reels showing workout routines using our product. Also interested in Stories takeover during launch week."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : '✉️ Generate Personalized Message'}
        </button>
      </form>

      {message && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-gray-800">Your Outreach Message</h3>
            <button
              onClick={copyToClipboard}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              📋 Copy to Clipboard
            </button>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {message}
            </pre>
          </div>
          <div className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Pro Tip:</strong> Always review and personalize further based on the influencer's recent content.
              Add a specific reference to their latest post for maximum impact!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
