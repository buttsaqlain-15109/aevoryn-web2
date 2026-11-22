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
  metadataBase: new URL("https://aevoryn.net"),
  title: "Aevoryn Services & Contracting Co. | Engineering Progress Across Saudi Arabia",
  description:
    "Aevoryn Services & Contracting Co. (CR 7054401679) provides integrated infrastructure support, manpower, materials and heavy equipment solutions for demanding industrial and development projects across Saudi Arabia.",
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
    title: "Aevoryn Services & Contracting Co. | Engineering Progress",
    description:
      "Integrated infrastructure support, manpower, materials and equipment across Saudi Arabia. Triple ISO certified, registered in the Saudi Aramco Supplier Management System.",
    url: "https://aevoryn.net",
    siteName: "Aevoryn Services & Contracting Co.",
    images: [
      {
        url: "/images/aevoryn-logo.jpg",
        width: 1024,
        height: 662,
        alt: "Aevoryn Services & Contracting Co. Official Emblem",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/images/aevoryn-logo-circle.png",
    apple: "/images/aevoryn-logo-circle.png",
  },
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
