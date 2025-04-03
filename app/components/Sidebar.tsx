'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { type NavItem, type FolderStructure } from './NavItems'
import { useState, useEffect } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useSidebar } from './SidebarContext'

interface SidebarProps {
  folders: FolderStructure[]
  items: NavItem[]
}

export function Sidebar({ folders, items: defaultItems }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { isOpen, toggle } = useSidebar()
  const [selectedFolder, setSelectedFolder] = useState<string>('')
  const [items, setItems] = useState<NavItem[]>([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setItems(defaultItems)
  }, [defaultItems])

  useEffect(() => {
    if (!selectedFolder) {
      router.push('/')
      setItems(defaultItems)
      return
    }

    const folder = folders.find(f => f.path === selectedFolder)
    const newItems = folder?.items || defaultItems
    setItems(newItems)

    // Navigate to the first item if available
    if (newItems.length > 0) {
      router.push(newItems[0].href)
    }
  }, [selectedFolder, folders, defaultItems, router])

  if (!isClient) {
    return null
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggle}
        className="fixed top-4 right-4 z-50 p-2 rounded-md bg-[var(--sidebar-bg)] border border-[var(--border-color)] md:hidden"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:fixed inset-y-0 left-0 z-40
        w-64 border-r border-[var(--border-color)] bg-[var(--sidebar-bg)]
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-screen overflow-hidden
      `}>
        <div className="flex-shrink-0 sticky top-0 z-20 p-4 border-b border-[var(--border-color)] bg-[var(--sidebar-bg)]">
          <div className="flex items-center justify-between gap-2">
            <div className="relative w-full">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full flex items-center justify-between font-semibold px-3 py-2 rounded-t transition-colors ${
                  isDropdownOpen ? 'bg-[var(--dropdown-bg)] border border-b-0 border-[var(--border-color)]' : 'hover:bg-[var(--sidebar-hover)]'
                }`}
              >
                {folders.find(f => f.path === selectedFolder)?.name || 'Select Company'}
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-[calc(100%-1px)] left-0 w-full bg-[var(--dropdown-bg)] border border-[var(--border-color)] rounded-b shadow-lg z-10">
                  {folders.map((folder) => (
                    <button
                      key={folder.path}
                      onClick={() => {
                        setSelectedFolder(folder.path)
                        setIsDropdownOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 hover:bg-[var(--sidebar-hover)] transition-colors ${
                        selectedFolder === folder.path ? 'bg-[var(--sidebar-hover)] font-medium' : ''
                      }`}
                    >
                      {folder.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 min-h-0 scrollbar-thin">
          {items.length === 0 ? (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400">
              <p>Please use the dropdown above to select a company and access its documentation.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? 'bg-[var(--sidebar-hover)] font-medium'
                        : 'hover:bg-[var(--sidebar-hover)]'
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
        <div className="flex-shrink-0 sticky bottom-0 z-20 p-4 border-t border-[var(--border-color)] bg-[var(--sidebar-bg)]">
          <div className="flex flex-col gap-3">
            <a
              href="https://www.linkedin.com/in/saifeemustafa/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1.5 rounded-md hover:bg-[var(--sidebar-hover)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="mailto:saifeestudy@gmail.com"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors px-2 py-1.5 rounded-md hover:bg-[var(--sidebar-hover)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Email
            </a>
          </div>
        </div>
      </aside>
    </>
  )
} 