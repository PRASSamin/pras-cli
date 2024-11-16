import NodeCache from 'node-cache';
import axios from 'axios';
import VersionDownloadView from './view';

const cache = new NodeCache({ stdTTL: 3600 });

async function fetchData() {
    const cachedData = cache.get('releases');
    if (cachedData) {
        return cachedData;
    }

    try {
        const response = await axios.get(process.env.NEXT_GITHUB_RELEASE_DATA_EP, {
            headers: { Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}` },
        });
        const data = response.data;
        cache.set('releases', data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default async function VersionDownload({ params }) {
    let { tag } = await params;
    const releases = await fetchData();

    if (!releases) {
        return <VersionDownloadView notFound={true} />
    }

    if (tag === 'latest') {
        tag = releases[0].tag_name;
    }
    if (!tag.startsWith('v')) {
        tag = `v${tag}`;
    }

    // Find the release with the given tag
    const data = releases.find(release => release.tag_name === tag);

    if (data) {
        if (releases[0].tag_name === tag) {
            data.is_latest = true;
        }
        return <VersionDownloadView data={data} fullData={releases} />;
    } else {
        return <VersionDownloadView notFound={true} />
    }
}

VersionDownload.displayName = 'VersionDownload';

export async function generateMetadata({ params }) {
    const { tag } = await params;
    const releases = await fetchData();

    if (!releases) {
        return {
            title: 'Page Not Found | 404',
            robots: 'noindex, nofollow',
        };
    }

    let selectedTag = tag === 'latest' ? releases[0].tag_name : tag;

    if (!selectedTag.startsWith('v')) {
        selectedTag = `v${selectedTag}`;
    }

    const pageUrl = `https://cli.pras.me/download/version/${tag !== selectedTag && selectedTag.includes(tag) || tag === 'latest' ? tag : selectedTag}`;

    const releaseExists = releases.some(release => release.tag_name === selectedTag);

    if (!releaseExists) {
        return {
            title: 'Page Not Found | 404',
            robots: 'noindex, nofollow',
        };
    }

    const pageTitle = `Download ${selectedTag.replace('v', '')} | PRAS CLI`;

    return {
        title: pageTitle,
        canonical: pageUrl,
        openGraph: {
            title: pageTitle,
            url: pageUrl,
        },
        alternates: {
            canonical: pageUrl,
            languages: { 'en-US': pageUrl },
        },
        robots: 'index, follow',
        structuredData: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            url: pageUrl,
            name: pageTitle,
        },
    };
}
