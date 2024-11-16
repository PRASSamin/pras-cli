import Home from "./view";

export default async function HomePage() {
  return <Home />;
}

HomePage.displayName = "HomePage";

export async function generateMetadata() {
  const pageTitle = `PRAS CLI`;
  const pageUrl = `https://cli.pras.me/`;

  return {
    title: pageTitle,
    canonical: pageUrl,
    openGraph: {
      title: pageTitle,
      url: pageUrl,
      site_name: pageTitle,
    },
    twitter: {
      title: pageTitle,
    },
    alternates: {
      canonical: pageUrl,
      languages: { 'en-US': pageUrl },
    },
    robots: 'index, follow',
    structuredData: {
      name: pageTitle,
      url: pageUrl,
    },
  };
}