import IntroductionPageView from "./view";
import { metatag } from "@/lib/metatag";

export default async function IntroductionPage() {
    return <IntroductionPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Introduction | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/introduction`;

    return metatag(pageTitle, pageUrl, 'index, follow');
  }