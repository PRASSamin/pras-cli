import E404 from "./errors/404";

export default function Custom404() {
  return <E404 />;
}

export async function generateMetadata() {
  const pageTitle = `Page Not Found | 404`;

  return {
    title: pageTitle,
    robots: 'noindex, nofollow',
  };
}
