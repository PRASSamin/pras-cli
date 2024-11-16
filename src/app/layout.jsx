import "./globals.css";
import KBar from "./components/kbar";
import Drawer from "./components/Drawer";
import GoogleAna from "./GoogleAna";
import { headers } from "next/headers";
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
  'PRAS CLI is a powerful, cross-platform command-line tool designed to simplify and speed up workflows for developers and tech-savvy users alike. With a suite of essential features and tools, PRAS CLI enhances productivity by streamlining everyday tasks, all in a single, easy-to-use package. Built for versatility and efficiency, PRAS CLI is your go-to solution for a seamless command-line experience.';
const image = `${process.env.NEXT_PUBLIC_BASE_URL}/prascli.svg`;

// Metadata generation
export async function generateMetadata() {
  const headersData = headers();

  return {
    icons: {
      icon: [
        { url: '/favicon/favicon-96x96.png', sizes: '96x96' },
        { url: '/favicon/favicon.ico', media: '(prefers-color-scheme: dark)' },
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
      type: 'website',
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'en_US',
      site_name: title,
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [image],
    },
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description: description,
      image: { '@type': 'ImageObject', url: image, width: 1200, height: 630 },
    },
    copyright: '© 2024 PRAS',
  };
}

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
