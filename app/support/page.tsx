'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Loader2, MessageCircle, Heart, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m here to support you on your wellness journey. How can I help you today? 💙',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    }

    // Add user message to chat
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Prepare messages for API (only role and content)
      const apiMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content
      }))

      const response = await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'I\'m here to listen and support you. Could you tell me more about what\'s on your mind?',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, and remember - you\'re not alone in this. 🤗',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="mx-auto max-w-4xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <MessageCircle className="h-8 w-8 text-blue-600" />
            </motion.div>
            <h1 className="text-4xl font-light text-slate-800">
              Support Chat
            </h1>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            You're not alone. Our empathetic AI is here to listen, support, and guide you 24/7.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="border-b border-slate-200/50">
              <CardTitle className="text-xl font-medium text-slate-700 flex items-center">
                <Heart className="w-5 h-5 mr-3 text-red-400" />
                Chat with Clairon AI
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-auto"
                >
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-slate-500">Online</span>
                  </div>
                </motion.div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'assistant'
                            ? 'bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 border border-blue-200'
                            : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white ml-auto'
                        }`}
                      >
                        <div className="text-sm leading-relaxed">
                          {message.content}
                        </div>
                        <div className={`text-xs mt-1 ${
                          message.role === 'assistant' ? 'text-slate-500' : 'text-slate-300'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 border border-blue-200 rounded-2xl px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200/50 p-6">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <Input 
                    placeholder="Share what's on your mind..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 border-slate-300 focus:border-blue-400 focus:ring-blue-200 bg-white/80"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue("I'm feeling anxious today")}
                    className="text-xs border-slate-300 hover:bg-slate-50"
                  >
                    I'm feeling anxious
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue("I need some encouragement")}
                    className="text-xs border-slate-300 hover:bg-slate-50"
                  >
                    Need encouragement
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue("Can you help me process my thoughts?")}
                    className="text-xs border-slate-300 hover:bg-slate-50"
                  >
                    Help process thoughts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Support Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h3 className="font-medium text-slate-700">Crisis Support</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              If you're in crisis, please reach out to a crisis hotline immediately. 
              In the US, call 988 for the Suicide & Crisis Lifeline.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="flex items-center space-x-2 mb-3">
              <Heart className="w-5 h-5 text-red-400" />
              <h3 className="font-medium text-slate-700">Remember</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              You're brave for reaching out. Every step toward wellness matters, 
              no matter how small it may seem.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  )
}