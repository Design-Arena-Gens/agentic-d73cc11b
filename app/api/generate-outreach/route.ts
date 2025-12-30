import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      influencerName,
      influencerHandle,
      platform,
      brandName,
      productDescription,
      campaignGoal,
      budget,
      contentDetails,
      tone
    } = body

    // Generate highly personalized outreach message
    const message = generateOutreachMessage({
      influencerName,
      influencerHandle,
      platform,
      brandName,
      productDescription,
      campaignGoal,
      budget,
      contentDetails,
      tone
    })

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: 'Failed to generate outreach' }, { status: 500 })
  }
}

interface OutreachParams {
  influencerName: string
  influencerHandle: string
  platform: string
  brandName: string
  productDescription: string
  campaignGoal: string
  budget: string
  contentDetails: string
  tone: string
}

function generateOutreachMessage(params: OutreachParams): string {
  const {
    influencerName,
    influencerHandle,
    platform,
    brandName,
    productDescription,
    campaignGoal,
    budget,
    contentDetails,
    tone
  } = params

  // Generate personalized opening based on tone
  const openings = {
    'professional-friendly': [
      `Hi ${influencerName}!`,
      `Hey ${influencerName},`,
      `Hi ${influencerName}, hope you're doing well!`
    ],
    'casual': [
      `Hey ${influencerName}! 👋`,
      `Hi ${influencerName}!`,
      `What's up ${influencerName}!`
    ],
    'enthusiastic': [
      `Hi ${influencerName}! 🌟`,
      `Hey ${influencerName}! So excited to reach out!`,
      `Hi ${influencerName}! Big fan of your work!`
    ],
    'formal': [
      `Dear ${influencerName},`,
      `Hello ${influencerName},`,
      `Greetings ${influencerName},`
    ]
  }

  const opening = openings[tone as keyof typeof openings]?.[Math.floor(Math.random() * 3)] || `Hi ${influencerName},`

  // Create personalized hooks based on platform
  const platformSpecific = {
    instagram: `I've been following your Instagram journey and your aesthetic is absolutely stunning. The way you engage with your community in your Stories really stands out.`,
    youtube: `I've been watching your YouTube channel and your video production quality is top-notch. Your ability to break down complex topics into digestible content is impressive.`,
    tiktok: `I've been enjoying your TikTok content - your creativity and ability to capture attention in seconds is remarkable. Your engagement rates speak volumes.`,
    twitter: `I've been following you on X/Twitter and love how you engage in meaningful conversations with your audience. Your thought leadership in the space is clear.`
  }

  const hook = platformSpecific[platform.toLowerCase() as keyof typeof platformSpecific] ||
    `I've been following your ${platform} content and really admire what you've built.`

  // Build the value proposition
  const valueProps = [
    `I think there could be a really authentic fit between your content style and what we're building at ${brandName}.`,
    `Your audience demographic aligns perfectly with who we're trying to reach, and I believe a collaboration could bring genuine value to your community.`,
    `What stood out to me is how you maintain authenticity while working with brands - that's exactly the kind of partnership we're looking for.`
  ]

  const valueProp = valueProps[Math.floor(Math.random() * valueProps.length)]

  // Create campaign details section
  const campaignSection = contentDetails
    ? `\n\nHere's what I'm thinking:\n${contentDetails}\n\nOf course, we're completely open to your creative input and what would resonate best with your audience.`
    : `\n\nI'd love to discuss content ideas that would feel natural for your audience while achieving our goal of ${campaignGoal.toLowerCase()}.`

  // Add budget if provided
  const budgetSection = budget
    ? `\n\nWe're working with a budget range of ${budget} and are committed to fair compensation that reflects your value and effort.`
    : `\n\nWe're committed to offering competitive compensation that reflects your reach and the quality of your work.`

  // Create closing based on tone
  const closings = {
    'professional-friendly': `Would you be open to a quick call next week to explore this? I'd love to hear your thoughts and see if there's a good fit.\n\nLooking forward to hearing from you!\n\nBest,\n[Your Name]\n${brandName}`,
    'casual': `Let me know if you'd be interested in chatting more about this! Would love to hear your ideas.\n\nCheers,\n[Your Name]\n${brandName}`,
    'enthusiastic': `I'd absolutely love to chat more about this with you! Are you free for a quick call sometime this week?\n\nExcited to hear your thoughts!\n\n[Your Name]\n${brandName}`,
    'formal': `I would appreciate the opportunity to discuss this collaboration further at your convenience.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]\n${brandName}`
  }

  const closing = closings[tone as keyof typeof closings] || closings['professional-friendly']

  // Assemble the complete message
  const message = `${opening}

${hook}

My name is [Your Name] and I'm reaching out from ${brandName}. We've developed ${productDescription.toLowerCase()}, and ${valueProp}

Our goal with this campaign is to ${campaignGoal.toLowerCase()}.${campaignSection}${budgetSection}

${closing}

P.S. - No pressure at all! If the timing isn't right or it's not a fit, I completely understand. Either way, keep creating amazing content!`

  return message
}
