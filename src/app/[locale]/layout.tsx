import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Oswald, Inter } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta: Record<string, { title: string; description: string }> = {
    lt: {
      title: "Viesulai \u2013 Lietuvos \u0161auli\u0173 s\u0105jungos b\u016brys",
      description:
        "Tre\u010Diasis b\u016brys \u201EViesulai\u201C \u2013 Lietuvos \u0161auli\u0173 s\u0105jungos padalinys Vilniuje. V\u0161\u012E Tre\u010Diasis b\u016brys \u2013 ne pelno siekianti paramos gav\u0117ja. Mokymai, pirmoji pagalba, dronai, pilietinis \u0161vietimas.",
    },
    en: {
      title: "Viesulai – Lithuanian Riflemen's Union squad",
      description:
        "Viesulai is a squad of the Lithuanian Riflemen's Union based in Vilnius, supported by VšĮ Trečiasis būrys, a non-profit registered charity. Training, first aid, drones, civic education.",
    },
  };
  return meta[locale] || meta.lt;
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${oswald.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-dark text-bone antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
