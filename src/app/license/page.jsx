import LicensePageView from "./view";
import axios from "axios";
import NodeCache from 'node-cache';
import { metatag } from "@/lib/metatag";

const cache = new NodeCache({ stdTTL: 3600 });

async function fetchData() {
    const cachedData = cache.get('license');
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await axios.get(
            process.env.NEXT_GITHUB_REPO_LICENSE_URL,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_GITHUB_AUTH_TOKEN}`,
                }
            }
        );
        const data = response.data;
        cache.set('license', data);
        return data;
    } catch (error) {
        console.error(error.code);
        return [];
    }
}

export default async function LicensePage() {
    const data = await fetchData();

    return <LicensePageView license={data} />
}

LicensePage.displayName = "LicensePage"

export async function generateMetadata() {
    return metatag('License | PRAS CLI', 'https://cli.pras.me/version', 'index, follow');
}