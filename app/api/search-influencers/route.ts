import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { niche, platform, minFollowers, maxFollowers, location, engagement } = body

    // Simulate AI-powered influencer search with realistic mock data
    const mockResults = generateMockInfluencers(niche, platform, minFollowers, maxFollowers, location, engagement)

    return NextResponse.json({ results: mockResults })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Failed to search influencers' }, { status: 500 })
  }
}

function generateMockInfluencers(
  niche: string,
  platform: string,
  minFollowers: string,
  maxFollowers: string,
  location: string,
  engagement: string
) {
  const names = [
    { name: 'Alex Rivera', handle: 'alexrivera' },
    { name: 'Maya Chen', handle: 'mayachen' },
    { name: 'Jordan Brooks', handle: 'jordanbrooks' },
    { name: 'Sarah Martinez', handle: 'sarahmartinez' },
    { name: 'Chris Taylor', handle: 'christaylor' },
    { name: 'Emily Watson', handle: 'emilywatson' },
    { name: 'Marcus Johnson', handle: 'marcusjohnson' },
    { name: 'Lisa Park', handle: 'lisapark' },
  ]

  const min = minFollowers ? parseInt(minFollowers) : 10000
  const max = maxFollowers ? parseInt(maxFollowers) : 500000

  const engagementRates = {
    high: { min: 5, max: 12 },
    medium: { min: 2, max: 5 },
    low: { min: 0.5, max: 2 },
    any: { min: 0.5, max: 12 }
  }

  const engRange = engagementRates[engagement as keyof typeof engagementRates] || engagementRates.any

  return names.slice(0, 6).map((person, idx) => ({
    name: person.name,
    handle: person.handle,
    platform: platform,
    followers: Math.floor(min + Math.random() * (max - min)),
    engagement: (engRange.min + Math.random() * (engRange.max - engRange.min)).toFixed(2),
    niche: niche,
    location: location || ['United States', 'United Kingdom', 'Canada', 'Australia'][idx % 4],
    verified: Math.random() > 0.5
  }))
}
