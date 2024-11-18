import CommandDjangoPageView from "./view";

export async function CommandDjangoPage() {
    return <CommandDjangoPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Django | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/django`;

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

export default CommandDjangoPage;