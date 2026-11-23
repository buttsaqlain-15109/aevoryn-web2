import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aevoryn-web-17d.pages.dev"),
  title: {
    default: "Aevoryn Services & Contracting Co. | Industrial Infrastructure & Support",
    template: "%s | Aevoryn Services & Contracting Co.",
  },
  description:
    "Aevoryn Services & Contracting Co. (CR 7054401679) provides civil infrastructure support, certified manpower, testing-compliant materials, and heavy equipment fleets across Saudi Arabia. Aramco Vendor Code: 10120422. Triple ISO certified.",
  keywords: [
    "Aevoryn Services & Contracting Co.",
    "Saudi Arabia contracting",
    "Infrastructure support Riyadh",
    "Saudi Aramco vendor 10120422",
    "Industrial manpower supply Saudi",
    "Construction materials Riyadh",
    "Heavy equipment rental Saudi Arabia",
    "ISO 9001 14001 45001 contractor",
  ],
  authors: [{ name: "Aevoryn Services & Contracting Co." }],
  openGraph: {
    title: "Aevoryn Services & Contracting Co. | Industrial Infrastructure & Support",
    description:
      "Civil infrastructure support, certified manpower, materials and heavy equipment across Saudi Arabia. Aramco Vendor Code: 10120422. Triple ISO certified.",
    url: "https://aevoryn-web-17d.pages.dev",
    siteName: "Aevoryn Services & Contracting Co.",
    images: [
      {
        url: "/images/branding/aevoryn-logo.png",
        width: 430,
        height: 430,
        alt: "Aevoryn Services & Contracting Co. Official Emblem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${jetbrainsMono.variable} ${ibmPlexSansArabic.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('aevoryn-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = savedTheme || (prefersDark ? 'dark' : 'light');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                  var savedLang = localStorage.getItem('aevoryn-lang') || 'en';
                  document.documentElement.setAttribute('lang', savedLang);
                  document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Corporation",
              name: "Aevoryn Services & Contracting Co.",
              alternateName: "شركة إيفورين للخدمات والمقاولات",
              url: "https://aevoryn.net",
              logo: "https://aevoryn.net/images/aevoryn-logo-circle.png",
              telephone: "+966173229527",
              email: "admin@aevoryn.net",
              taxID: "7054401679",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Alahsa Street, Almalaz",
                addressLocality: "Riyadh",
                postalCode: "11543",
                addressCountry: "SA",
              },
              sameAs: ["https://aevoryn.net"],
            }),
          }}
        />
      </head>
      <body className="font-body antialiased bg-page text-primary selection:bg-brand-cobalt selection:text-white">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
