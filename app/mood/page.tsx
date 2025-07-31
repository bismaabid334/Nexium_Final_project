'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sun, Cloud, CloudRain, Zap } from 'lucide-react';
import { saveMood } from '@/lib/save-mood';

const moods = [
  { label: 'Great', emoji: '😊', icon: Sun, color: 'from-green-100 to-green-200', hover: 'from-green-200 to-green-300' },
  { label: 'Good', emoji: '🙂', icon: Heart, color: 'from-blue-100 to-blue-200', hover: 'from-blue-200 to-blue-300' },
  { label: 'Okay', emoji: '😐', icon: Cloud, color: 'from-gray-100 to-gray-200', hover: 'from-gray-200 to-gray-300' },
  { label: 'Low', emoji: '😔', icon: CloudRain, color: 'from-purple-100 to-purple-200', hover: 'from-purple-200 to-purple-300' },
  { label: 'Difficult', emoji: '😰', icon: Zap, color: 'from-red-100 to-red-200', hover: 'from-red-200 to-red-300' },
];

export default function Mood() {
  const [selected, setSelected] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSave = async () => {
    if (selected === null) return;
    setLoading(true);
    try {
      await saveMood({ user_id: crypto.randomUUID(), mood: moods[selected].label, note });
      setDone(true);
      setTimeout(() => {
        setSelected(null);
        setNote('');
        setDone(false);
      }, 2000);
    } catch {
      alert('Could not save mood');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <main className="mx-auto max-w-2xl px-6 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-light text-slate-800 text-center">How are you feeling?</h1>
          <p className="mt-4 text-center text-slate-600">Take a moment to check in with yourself.</p>
        </motion.div>

        <Card className="mt-12 border-0 shadow-lg bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-light text-slate-700">Today's Check-in</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {moods.map((m, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelected(i)}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center space-y-2 transition-all
                    bg-gradient-to-br ${selected === i ? m.hover : m.color}
                    ${selected === i ? 'border-emerald-500 ring-4 ring-emerald-200' : 'border-slate-200'}`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="font-medium text-sm">{m.label}</span>
                  <m.icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>

            <AnimatePresence>
              {selected !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Textarea
                    placeholder="Add a note (optional)…"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="resize-none bg-white/50"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full"
                  >
                    {done ? '✅ Saved' : loading ? 'Saving…' : 'Log my mood'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}