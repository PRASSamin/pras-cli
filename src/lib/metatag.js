export const metatag = (pageTitle, pageUrl, robots) => {
  const fav = "https://cli.pras.me/favicon/favicon.svg";
  return {
    title: pageTitle,
    canonical: pageUrl,
    openGraph: {
      title: pageTitle,
      url: pageUrl,
      siteName: pageTitle,
      images: [
        {
          url: fav,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: pageTitle,
      creator: "@prassamin78",
      images: [fav],
    },
    alternates: {
      canonical: pageUrl,
      languages: { "en-US": pageUrl },
    },
    robots: robots,
    structuredData: {
      name: pageTitle,
      url: pageUrl,
    },
  };
};