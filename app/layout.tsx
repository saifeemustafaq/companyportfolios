import './globals.css'
import { Inter } from 'next/font/google'
import { Sidebar } from './components/Sidebar'
import { ThemeProvider } from './components/ThemeProvider'
import { NavItems } from './components/NavItems'

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
          <div className="flex">
            <Sidebar folders={folders} items={items} />
            <main className="flex-1 p-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
