import Home from "./landing/view";
import { metatag } from "@/lib/metatag";

export default async function HomePage() {
  return <Home />;
}

HomePage.displayName = "HomePage";

export async function generateMetadata() {
  return metatag('PRAS CLI', 'https://cli.pras.me/', 'index, follow');
}