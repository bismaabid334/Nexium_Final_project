'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Journal', href: '/journal' },
  { title: 'Mood', href: '/mood' },
  { title: 'Support', href: '/support' },
  { title: 'Settings', href: '/settings' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-indigo-600" />
          <span className="font-semibold text-slate-900 dark:text-slate-100">Clairon</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400',
                pathname === href && 'text-indigo-600 dark:text-indigo-400'
              )}
            >
              {title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/signin')}>
            Sign In
          </Button>

          <button
            className="p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          {navItems.map(({ title, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {title}
            </Link>
          ))}
          <Button className="mt-4 w-full">Sign In</Button>
        </div>
      )}
    </header>
  )
}