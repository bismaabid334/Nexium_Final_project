// app/api/journal/route.ts
import clientPromise from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json()
    if (!text || typeof text !== 'string')
      return NextResponse.json({ error: 'missing text' }, { status: 400 })

    const client = await clientPromise
    const db   = client.db('mental_health')   // your DB
    const col  = db.collection('journal')

    const result = await col.insertOne({
      text,
      createdAt: new Date()
    })

    return NextResponse.json({ id: result.insertedId })
  } catch (err: any) {
    console.error('Mongo error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}