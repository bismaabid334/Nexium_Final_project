// src/lib/save-mood.ts  (browser-safe, no Supabase import)
export async function saveMood(payload: {
  user_id: string;
  mood: string;
  note?: string;
}) {
  const res = await fetch('/api/mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error((await res.json())?.error || 'Failed');
}