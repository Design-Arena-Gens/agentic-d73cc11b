import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url } = body

    // Extract platform and username from URL
    const platform = extractPlatform(url)
    const username = extractUsername(url)

    // Generate comprehensive analysis
    const analysis = generateMockAnalysis(username, platform)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze influencer' }, { status: 500 })
  }
}

function extractPlatform(url: string): string {
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube'
  if (url.includes('tiktok.com')) return 'TikTok'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X'
  return 'Unknown'
}

function extractUsername(url: string): string {
  const match = url.match(/(?:@|\/)([\w.-]+)\/?(?:\?|$)/)
  return match ? match[1] : 'influencer'
}

function generateMockAnalysis(username: string, platform: string) {
  const followers = Math.floor(50000 + Math.random() * 450000)
  const engagement = (2 + Math.random() * 8).toFixed(2)

  return {
    name: username.charAt(0).toUpperCase() + username.slice(1),
    username: username,
    platform: platform,
    followers: followers,
    engagement: engagement,
    avgViews: Math.floor(followers * 0.3),
    totalPosts: Math.floor(200 + Math.random() * 800),

    contentStrategy: `This creator has built a strong presence through consistent, high-quality content that resonates deeply with their audience. They post ${Math.floor(3 + Math.random() * 4)} times per week, maintaining a balanced mix of educational, entertaining, and promotional content. Their unique voice and authentic storytelling have created a loyal community that actively engages with every post.`,

    contentThemes: [
      'Lifestyle & Daily Routines',
      'Product Reviews & Recommendations',
      'Behind-the-Scenes Content',
      'Community Q&A Sessions',
      'Educational Tips & Tutorials'
    ],

    postingFrequency: `${Math.floor(3 + Math.random() * 4)} posts per week, typically ${['Monday/Wednesday/Friday', 'Tuesday/Thursday/Saturday', 'Every other day'][Math.floor(Math.random() * 3)]} between 10 AM - 2 PM EST`,

    audienceDemographics: `${Math.floor(55 + Math.random() * 25)}% female, ${Math.floor(18 + Math.random() * 8)}% ages 18-24, ${Math.floor(35 + Math.random() * 15)}% ages 25-34`,

    audienceLocations: `United States (${Math.floor(40 + Math.random() * 20)}%), UK (${Math.floor(10 + Math.random() * 10)}%), Canada (${Math.floor(5 + Math.random() * 10)}%), Australia (${Math.floor(5 + Math.random() * 5)}%)`,

    audienceInterests: 'Fitness, Wellness, Fashion, Travel, Technology, Sustainable Living',

    brandFit: `This influencer is an excellent fit for brands seeking authentic partnerships with creators who have genuine influence over their audience. Their engagement rate of ${engagement}% is ${parseFloat(engagement) > 5 ? 'significantly above' : 'above'} industry average, indicating strong audience trust. Previous brand collaborations show professional execution and content that feels natural rather than forced.`,

    recommendedApproach: `Lead with personalization - reference their recent content specifically (especially their ${['latest tutorial', 'recent Q&A', 'viral post'][Math.floor(Math.random() * 3)]}). They value creative freedom, so pitch a collaboration framework rather than rigid requirements. Emphasize long-term partnership potential over one-off campaigns. Budget range: $${Math.floor(followers / 100)}-$${Math.floor(followers / 50)} per post.`,

    recentPosts: [
      {
        title: 'Morning Routine: How I Stay Productive',
        likes: Math.floor(followers * 0.05),
        comments: Math.floor(followers * 0.002),
        views: Math.floor(followers * 0.4)
      },
      {
        title: 'Honest Review: Latest Tech Gadget Unboxing',
        likes: Math.floor(followers * 0.06),
        comments: Math.floor(followers * 0.003),
        views: Math.floor(followers * 0.5)
      },
      {
        title: 'Behind the Scenes: Content Creation Day',
        likes: Math.floor(followers * 0.04),
        comments: Math.floor(followers * 0.0015),
        views: Math.floor(followers * 0.35)
      }
    ]
  }
}
