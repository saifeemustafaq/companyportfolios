import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from './components/Sidebar'
import { ThemeProvider } from './components/ThemeProvider'
import { NavItems } from './components/NavItems'
import { SidebarProvider } from './components/SidebarContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Documentation',
  description: 'Documentation site',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { folders, items } = await NavItems();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen relative">
              <Sidebar folders={folders} items={items} />
              <main className="flex-1 w-full md:ml-64">
                <div className="max-w-4xl mx-auto p-4 md:p-8">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
