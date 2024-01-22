import './globals.css'

import Footer from '../components/layout/footer'
import Error from '../components/layout/error'

export const metadata = {
  title: 'MERLE',
  description:
    'Merle er en norsk nettbutikk som selger moterelaterte vintageprodukter som klær, vesker og annet tilbehør',
}

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>
        {children}
        <Error />
        <Footer />
      </body>
    </html>
  )
}
