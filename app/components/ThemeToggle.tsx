'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative inline-block">
      <div
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`w-12 h-7 rounded-full p-0.5 cursor-pointer transition-colors duration-300 ease-in-out border-2 ${
          theme === 'dark' 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-yellow-100 border-yellow-300'
        }`}
      >
        <div
          className={`flex items-center justify-center w-5 h-5 rounded-full transform transition-transform duration-300 ease-in-out shadow-sm ${
            theme === 'dark'
              ? 'translate-x-5 bg-gray-900'
              : 'translate-x-0 bg-yellow-400'
          }`}
        >
          {theme === 'dark' ? (
            <Moon className="h-3 w-3 text-gray-100" />
          ) : (
            <Sun className="h-3 w-3 text-yellow-600" />
          )}
        </div>
      </div>
    </div>
  )
} 