import DonatePageView from "./view";

export default async function IntroductionPage() {
    return <DonatePageView />;
}

export async function generateMetadata() {
    const pageTitle = `Donate | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/donate`;

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