import type { Metadata, Viewport } from "next";
import "@/index.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://pratikshakhandbahale.vercel.app";
const PERSON_NAME = "Pratiksha Khandbahale";
const SITE_TITLE = "Pratiksha Khandbahale - AI & Data Science Engineer | Full Stack Developer Portfolio";
const SITE_DESCRIPTION =
  "Official portfolio of Pratiksha Khandbahale, an AI & Data Science Engineer and Junior Associate at ESDS Software Solution Limited specializing in Full Stack Web Development, Machine Learning, Next.js, and Intelligent Web Systems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${PERSON_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${PERSON_NAME} Portfolio`,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "Pratiksha Khandbahale",
    "Pratiksha Khandbahale Portfolio",
    "Pratiksha Khandbahale Developer",
    "Pratiksha Khandbahale ESDS",
    "AI & Data Science Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Machine Learning Engineer",
    "Computer Science and Engineering",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: `${PERSON_NAME} Portfolio`,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/photo.png",
        width: 1200,
        height: 630,
        alt: `${PERSON_NAME} - Developer Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/photo.png"],
    creator: "@pratiksha",
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg?v=3",
    apple: "/favicon.svg?v=3",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060e11",
};

// Machine-readable Schema.org JSON-LD structured data for Google Knowledge Graph
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/photo.png`,
      jobTitle: "AI & Data Science Engineer | Junior Associate",
      worksFor: {
        "@type": "Organization",
        name: "ESDS Software Solution Limited",
      },
      sameAs: [
        "https://www.linkedin.com/in/pratiksha-khandbahale-005b39256/",
        "https://github.com/pratikshaa27",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "K. K. Wagh Institute of Engineering Education and Research (KKWIEER)",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Data Science",
        "Machine Learning",
        "Full Stack Web Development",
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "Node.js",
        "MongoDB",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PERSON_NAME} Portfolio`,
      publisher: {
        "@id": `${SITE_URL}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: SITE_TITLE,
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#person`,
      },
      mainEntity: {
        "@id": `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
        <link rel="alternate icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/favicon.svg?v=3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Syne:wght@700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Inject Schema.org JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-bg text-text antialiased selection:bg-purple-accent/30 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
