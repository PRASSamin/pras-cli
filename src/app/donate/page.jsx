import DonatePageView from "./view";
import { metatag } from "@/lib/metatag";

export default async function IntroductionPage() {
    return <DonatePageView />;
}

export async function generateMetadata() {
    const pageTitle = `Donate | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/donate`;

    return metatag(pageTitle, pageUrl, 'index, follow');
}