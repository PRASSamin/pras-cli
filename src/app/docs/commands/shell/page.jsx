import CommandShellPageView from "./view";

export async function CommandShellPage() {
    return <CommandShellPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Shell | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/shell`;

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


export default CommandShellPage