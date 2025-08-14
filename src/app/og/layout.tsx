// src/app/og/layout.tsx
import '../../styles/tailwind.css'
import { Inter, Lexend } from 'next/font/google'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend', display: 'swap' })

export default function OGLayout({ children }: { children: React.ReactNode }) {
  // Bare layout (no site header/footer), but with fonts + Tailwind CSS
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
