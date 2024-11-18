import InstallationPageView from "./view";
import { metatag } from "@/lib/metatag";

export default async function IntroductionPage() {
  return <InstallationPageView />;
}

export async function generateMetadata() {
  const pageTitle = `Installation | PRAS CLI`;
  const pageUrl = `https://cli.pras.me/docs/installation`;

  return metatag(pageTitle, pageUrl, 'index, follow');
}