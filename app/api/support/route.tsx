// app/api/support/route.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    console.log('🔄 API route called')
    
    const body = await req.json()
    console.log('📝 Request body:', body)
    
    const messages = body.messages

    // Validate that messages array exists and has content
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('❌ Invalid messages array')
      return NextResponse.json(
        { response: 'No messages provided.' },
        { status: 400 }
      )
    }

    // Check if OpenRouter API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      console.error('❌ OPENROUTER_API_KEY is not configured')
      return NextResponse.json(
        { response: 'Thanks for your message! I\'m a demo AI assistant. In a real app, I would connect to an AI service to provide helpful responses.' },
        { status: 200 }
      )
    }

    console.log('🔄 Sending request to OpenRouter...')
    
    const apiPayload = {
      model: 'google/gemini-2.5-flash-lite',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful, empathetic AI assistant for Clairon, a mental health and wellness app. Provide supportive, understanding responses while being careful not to provide medical advice. If someone is in crisis, encourage them to seek professional help.'
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
    }
    
    console.log('📤 API Payload:', JSON.stringify(apiPayload, null, 2))
    
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/support',
        'X-Title': 'google/gemini-2.5-flash-lite'
      },
      body: JSON.stringify(apiPayload),
    })

    console.log('📡 OpenRouter response status:', res.status)

    if (!res.ok) {
      const errorText = await res.text()
      console.error('❌ OpenRouter API error:', res.status, errorText)
      
      return NextResponse.json(
        { response: 'I apologize, but I\'m having trouble connecting to my AI service right now. Please try again in a moment.' },
        { status: 200 } // Return 200 so the frontend doesn't error
      )
    }

    const result = await res.json()
    console.log('✅ OpenRouter response received:', result)

    const reply = result?.choices?.[0]?.message?.content ?? 'I apologize, but I didn\'t receive a proper response. Please try rephrasing your message.'

    return NextResponse.json({ response: reply })
    
  } catch (error) {
    console.error('❌ Detailed error in /api/support:', error)
    console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { response: 'I apologize, but I encountered an unexpected error. Please try again later.' },
      { status: 200 } // Return 200 so the frontend doesn't error
    )
  }
}