import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const url = "https://api.buttondown.com/v1/subscribers"
    const headers = {
      "Authorization": `Token ${process.env.BUTTONDOWN_API_KEY}`,
      "Content-Type": "application/json"
    }
    
    const data = {
      email_address: email,
      tags: ["newsletter", "welcome"]
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Buttondown API error:', errorData)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: response.status }
      )
    }

    const result = await response.json()
    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}