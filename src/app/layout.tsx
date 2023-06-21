// Import global stylesheets, and the Inter font.
import './globals.css'
import { Inter } from 'next/font/google'

// Creates an instance of the Inter font.
const inter = Inter({ subsets: ['latin'] })

// Exports the metadata for the page (<head>).
export const metadata = {
  title: 'Influx',
  description: 'Find the best deals on the internet.',
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
      {/* Place all children inside the body tag. */}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
