import { NextResponse } from "next/server";

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  const handleDownloadPage = () => {
    if (pathname === "/download/version/" || pathname === "/download/version" || pathname === "/download/" || pathname === "/download") {
      return NextResponse.redirect(new URL("/download/version/latest", req.url));
    }
    return NextResponse.next(); // Proceed if no redirect
  };

  // Check if the request is for a /download path
  if (pathname.startsWith("/download")) {
    return handleDownloadPage();
  }

  const handleDocsPage = () => {
    if (pathname === '/docs' || pathname === '/docs/') {
      return NextResponse.redirect(new URL('/docs/introduction', req.url));
    }
  }

  if (pathname.startsWith("/docs")) {
    return handleDocsPage();
  }

  if (pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Allow the request to proceed for other paths
  return NextResponse.next();
}
