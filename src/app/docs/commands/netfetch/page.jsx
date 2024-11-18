import CommandNetfetchPageView from "./view";

export async function CommandNetFetchPage() {
    return <CommandNetfetchPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Netfetch | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/netfetch`;

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

export default CommandNetFetchPage;