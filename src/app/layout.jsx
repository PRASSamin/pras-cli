import "./globals.css";
import KBar from "./components/kbar";
import Drawer from "./components/Drawer";
import GoogleAna from "./GoogleAna";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

// Constants
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
};

const title = 'PRAS CLI';
const description =
  'PRAS CLI is a versatile, cross-platform command-line tool that simplifies workflows and enhances productivity. Streamline tasks, boost efficiency, and enjoy a seamless command-line experience with PRAS CLI, the ultimate tool for developers and tech-savvy users.';

export const metadata = {
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96' },
      { url: '/favicon/favicon-192x192.png', sizes: '192x192' },
      { url: '/favicon/favicon-512x512.png', sizes: '512x512' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  publisher: 'PRAS',
  verification: {
    google: '1Hibq62KV62bSjoXtQEEWNH7oArNJYkycmuyJ2yOaW4',
  },
  appleWebApp: {
    title: 'PRAS CLI',
  },
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
  },
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: description,
    image: { '@type': 'ImageObject', url: 'https://cli.pras.me/favicon/favicon.svg', width: 1200, height: 630 },
  },
  copyright: '© 2024 PRAS',
};

// Root Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <SpeedInsights />
        <GoogleAna />
        <Drawer>
          <KBar>{children}</KBar>
        </Drawer>
      </body>
    </html>
  );
}
