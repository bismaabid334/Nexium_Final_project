'use client'

import Link from 'next/link'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookOpen, Heart, Settings, HelpCircle, Sparkles } from 'lucide-react'

const cards = [
  { 
    icon: BookOpen, 
    title: 'Journal', 
    desc: 'Your private sanctuary for thoughts', 
    href: '/journal',
    color: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600'
  },
  { 
    icon: Heart, 
    title: 'Mood Tracker', 
    desc: 'Gentle check-ins with yourself', 
    href: '/mood',
    color: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600'
  },
  { 
    icon: Settings, 
    title: 'Settings', 
    desc: 'Personalize your wellness space', 
    href: '/settings',
    color: 'from-gray-50 to-gray-100',
    iconColor: 'text-gray-600'
  },
  { 
    icon: HelpCircle, 
    title: 'Support', 
    desc: 'Always here when you need us', 
    href: '/support',
    color: 'from-green-50 to-green-100',
    iconColor: 'text-green-600'
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="text-center">
          <div className="relative inline-block">
            <div className="absolute -top-4 -right-4">
              <Sparkles className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight text-slate-800 leading-tight">
              Welcome to{' '}
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clairon
              </span>
            </h1>
          </div>
          
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            A gentle companion for your mental wellness journey. 
            Track, reflect, and grow in a space designed just for you.
          </p>
          
          <div>
            <Button 
              asChild 
              className="mt-8 px-8 py-3 text-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Link href="/signin">
                Begin Your Journey
                <span className="ml-2 inline-block">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </section>

        <section className="mt-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ icon: Icon, title, desc, href, color, iconColor }) => (
              <div key={title}>
                <Link href={href} className="block h-full">
                  <Card className={`group cursor-pointer h-full border-0 shadow-md hover:shadow-xl transition-all duration-300 backdrop-blur-sm bg-gradient-to-br ${color} hover:bg-gradient-to-br hover:from-white/80 hover:to-white/60`}>
                    <CardHeader className="p-6 h-full flex flex-col">
                      <div className="flex-shrink-0">
                        <div className="inline-flex p-3 rounded-full bg-white/70 group-hover:bg-white/90 transition-colors duration-300">
                          <Icon className={`h-6 w-6 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-center">
                        <CardTitle className="mt-4 text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
                          {title}
                        </CardTitle>
                        <CardDescription className="mt-2 text-slate-600 group-hover:text-slate-700 transition-colors duration-300 leading-relaxed">
                          {desc}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/20">
            <h2 className="text-2xl font-light text-slate-700 mb-4">
              Take it one day at a time
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto leading-relaxed">
              Your mental health matters. Start with small steps, be kind to yourself, 
              and remember—progress isn't always linear.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}