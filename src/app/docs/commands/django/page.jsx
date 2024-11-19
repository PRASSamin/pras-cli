import CommandDjangoPageView from "./view";
import { metatag } from "@/lib/metatag";

export async function CommandDjangoPage() {
    return <CommandDjangoPageView />;
}

export async function generateMetadata() {
    const pageTitle = `Django | PRAS CLI`;
    const pageUrl = `https://cli.pras.me/docs/commands/django`;

    return metatag(pageTitle, pageUrl, 'index, follow', ['django', 'django command', 'django project', 'django project creation', 'django app', 'django app creation', 'django project setup', 'django setup']);
}

export default CommandDjangoPage;