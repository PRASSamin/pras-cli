import React from 'react';
import axios from 'axios';
import VersionDownloadView from './view';

async function fetchData() {
    try {
        const response = await axios.get(
            process.env.NEXT_GITHUB_RELEASE_DATA_EP,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}`,
                }
            }
        );
        return response.data;
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