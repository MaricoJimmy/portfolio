import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { LanguageProvider } from "@/providers/language-provider";
import "./globals.css";

function resolveSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL;
  if (candidate) {
    try {
      const url = new URL(candidate);
      if (url.protocol === "http:" || url.protocol === "https:") return url;
    } catch {
      // Invalid deployment configuration falls through to the local-build URL.
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: "Vu Van Tung — Software Engineer & Aspiring AI Engineer",
  description:
    "Portfolio of Vu Van Tung, a software engineer focused on computer vision and applied AI.",
  alternates: { canonical: "/" },
  authors: [{ name: "Vu Van Tung", url: "https://github.com/MaricoJimmy" }],
  openGraph: {
    description:
      "Evidence-led computer vision, applied AI, and software engineering case studies.",
    images: [{ alt: "Vu Van Tung — AI portfolio", height: 630, url: "/opengraph-image", width: 1200 }],
    title: "Vu Van Tung — AI & Software Engineering Portfolio",
    type: "website",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#101011",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          {children}
          <LanguageSwitcher />
        </LanguageProvider>
      </body>
    </html>
  );
}
