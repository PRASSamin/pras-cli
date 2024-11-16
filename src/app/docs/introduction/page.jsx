import IntroductionPageView from "./view";

export default async function IntroductionPage() {
    return <IntroductionPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Introduction | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/introduction`;

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