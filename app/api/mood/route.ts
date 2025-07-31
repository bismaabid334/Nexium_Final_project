// src/app/api/mood/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,  
  { auth: { persistSession: false } }
);

export async function POST(req: NextRequest) {
  try {
    const { user_id, mood, note } = await req.json();

    if (!mood)
      return NextResponse.json({ error: 'Missing mood' }, { status: 400 });

    const { error } = await supabase
      .from('mood_logs')
      .insert({ user_id, mood, note });

    if (error) throw error;

    return NextResponse.json({ message: 'Mood logged' });
  } catch (err: any) {
    console.error('Supabase error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}