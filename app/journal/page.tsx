'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Save, Check, Feather, Heart, Lightbulb } from 'lucide-react'

const prompts = [
  "What am I grateful for today?",
  "How did I show kindness to myself today?",
  "What challenged me, and how did I handle it?",
  "What brought me joy or peace today?",
  "What would I like to let go of?",
  "What do I need right now?",
]

export default function Journal() {
  const [text, setText] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null)
  const [wordCount, setWordCount] = useState(0)

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)
    setWordCount(newText.trim() ? newText.trim().split(/\s+/).length : 0)
  }

  const save = async () => {
    if (!text.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      if (!res.ok) throw new Error('save failed')
      
      setSaved(true)
      setTimeout(() => {
        setText('')
        setWordCount(0)
        setSaved(false)
        setSelectedPrompt(null)
      }, 2000)
    } catch (e) {
      alert('Could not save entry')
    } finally {
      setSaving(false)
    }
  }

  const usePrompt = (prompt: string) => {
    setSelectedPrompt(prompt)
    setText(prompt + '\n\n')
    setWordCount(prompt.trim().split(/\s+/).length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Feather className="h-8 w-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-light text-slate-800">
              Your Journal
            </h1>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            This is your private sanctuary. Write freely, without judgment. 
            Let your thoughts flow like water on paper.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Writing Prompts Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-700 flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                  Writing Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600 mb-4">
                  Feeling stuck? Try one of these gentle prompts:
                </p>
                {prompts.map((prompt, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => usePrompt(prompt)}
                    className={`
                      w-full text-left p-3 rounded-xl border-2 transition-all duration-300
                      ${selectedPrompt === prompt
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-white/50 border-slate-200 hover:border-blue-200 hover:bg-blue-50 text-slate-700'
                      }
                    `}
                  >
                    <div className="text-sm leading-relaxed">
                      {prompt}
                    </div>
                  </motion.button>
                ))}
                
                <motion.div
                  className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-start space-x-2">
                    <Heart className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-slate-600 leading-relaxed">
                      <strong className="text-green-700">Tip:</strong> There's no perfect way to journal. 
                      Write whatever feels right for you today.
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Journal Writing Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-light text-slate-700 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    New Entry
                  </CardTitle>
                  <div className="text-sm text-slate-500">
                    {wordCount} {wordCount === 1 ? 'word' : 'words'}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Display */}
                <div className="text-sm text-slate-500 text-center">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                {/* Writing Area */}
                <motion.div
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Textarea
                    rows={16}
                    placeholder="Dear journal... What's on your mind today?"
                    className="resize-none border-slate-200 focus:border-blue-300 focus:ring-blue-200 bg-white/80 text-slate-700 leading-relaxed text-base p-6"
                    value={text}
                    onChange={handleTextChange}
                  />
                  
                  {/* Gentle writing indicator */}
                  <AnimatePresence>
                    {text.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-4 right-4"
                      >
                        <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                          Writing...
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={save} 
                    disabled={saving || !text.trim() || saved} 
                    className="flex-1 py-3 text-base bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <AnimatePresence mode="wait">
                      {saved ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Entry Saved!
                        </motion.span>
                      ) : saving ? (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          />
                          Saving...
                        </motion.span>
                      ) : (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Entry
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setText('')
                      setWordCount(0)
                      setSelectedPrompt(null)
                    }}
                    disabled={!text.trim()}
                    className="py-3 text-base border-slate-300 hover:bg-slate-50 transition-all duration-300"
                  >
                    Clear
                  </Button>
                </div>

                {/* Encouraging Message */}
                <AnimatePresence>
                  {text.length > 100 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-slate-600">
                          You're doing great! Keep writing, your thoughts matter.
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Inspiration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md max-w-2xl mx-auto">
            <blockquote className="text-slate-600 italic leading-relaxed">
              "Writing is the painting of the voice. Your voice matters, your story matters, 
              and this moment matters."
            </blockquote>
          </div>
        </motion.div>
      </main>
    </div>
  )
}