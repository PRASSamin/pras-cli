import CommandNetfetchPageView from "./view";
import { metatag } from "@/lib/metatag";

export async function CommandNetFetchPage() {
    return <CommandNetfetchPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Netfetch | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/netfetch`;

    return metatag(pageTitle, pageUrl, 'index, follow');
}

export default CommandNetFetchPage;