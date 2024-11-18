import CommandShellPageView from "./view";
import { metatag } from "@/lib/metatag";

export async function CommandShellPage() {
    return <CommandShellPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Shell | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/shell`;

    return metatag(pageTitle, pageUrl, 'index, follow');
}


export default CommandShellPage