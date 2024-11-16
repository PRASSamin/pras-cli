import InstallationPageView from "./view";

export default async function IntroductionPage() {
    return <InstallationPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Installation | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/installation`;

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