import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Space_Mono, VT323 } from 'next/font/google'
import './globals.css'

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  weight: ['400', '700'],
  subsets: ['latin'],
})
const vt323 = VT323({
  variable: '--font-vt323',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'THE UNDERGROUND ARCHIVE // Creative Protest Methods',
  description:
    'A clandestine digital archive of creative protest methods used around the world — art as protest, creative interventions, alternative technology, documentation, and transmission.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceMono.variable} ${vt323.variable} bg-background`}
    >
      <body className="font-mono antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
