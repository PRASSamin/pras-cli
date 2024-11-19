import VersionPageView from "./view";
import axios from "axios";
import NodeCache from 'node-cache';
import { metatag } from "@/lib/metatag";

const cache = new NodeCache({ stdTTL: 3600 });

async function fetchData() {
    const cachedData = cache.get('version');
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await axios.get(
            process.env.NEXT_GITHUB_REPO_MENIFEST_URL,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}`,
                }
            }
        );
        const data = response.data;
        cache.set('version', data);
        return data;
    } catch (error) {
        console.error(error.code);
        return [];
    }
}

export default async function VersionPage() {
    const data = await fetchData();

    return <VersionPageView version={data} />
}

VersionPage.displayName = "VersionPage"

export async function generateMetadata() {
    return metatag('Version | PRAS CLI', 'https://cli.pras.me/version', 'index, follow');
}