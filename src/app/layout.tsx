// Import global stylesheets, and the Inter font.
import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalProvider } from './backend/hooks/GlobalContext'

// Creates an instance of the Inter font.
const inter = Inter({ subsets: ['latin'] })

import localFont from 'next/font/local'
 
// Font files can be colocated inside of `app`
const sohne = localFont({
  src: [
    {
      path: './backend/fonts/sohne/sohne_buch.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_buch_kursiv.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_dreiviertelfett.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_dreiviertelfett_kursiv.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_extrafett.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_extrafett_kursiv.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_extraleicht.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_extraleicht_kursiv.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_fett.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_fett_kursiv.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_halbfett.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_halbfett_kursiv.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_kraftig.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_kraftig_kursiv.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './backend/fonts/sohne/sohne_leicht.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './backend/fonts/sohne/sohne_leicht_kursiv.otf',
      weight: '200',
      style: 'italic',
    }
  ]
})

// Exports the metadata for the page (<head>).
export const metadata = {
  title: 'Influx',
  description: 'Find the best deals on the internet.',
  metadata: {
    charset: 'utf-8',
  }
}

// Defines the RootLayout component. The children
// prop is used to pass any child elements to the function.
export default function RootLayout({
  children,
}: {
  // All children of the RootLayout component that are
  // ReactNode instances (i.e. TSX elements) are accepted.
  children: React.ReactNode
}) {
  return (
    // Renders normal HTML elements.
    <html lang="en">
      <GlobalProvider>
      {/* Place all children inside the body tag. */}
      <body className={sohne.className}>{children}</body>
      </GlobalProvider>
    </html>
  )
}
