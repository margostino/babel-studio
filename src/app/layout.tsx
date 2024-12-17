import AppSidebar from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Head from 'next/head'
import { cookies } from 'next/headers'
import '../styles/globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Babel',
  description: 'Bridge the gap between your brain and the world',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <Head>
        <title>Babel Studio</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={cn(
          'min-h-screen bg-background text-foreground font-sans antialiased',
          inter.className
        )}
      >
        <div className="flex min-h-screen">
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <div className="flex-1 flex flex-col min-h-screen">
              <main className="flex-1">{children}</main>
              <footer>
                <div className="container mx-auto text-center text-sm text-muted-foreground py-4">
                  © {new Date().getFullYear()} Babel Foundation. All rights reserved.
                </div>
              </footer>
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}
