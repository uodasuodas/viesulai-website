import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

// Page title "<nav label> – Viesulai"; description is inherited from the locale layout
export const pageMetadata =
  (navKey: string) =>
  async ({ params }: Props): Promise<Metadata> => {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "nav" });
    return { title: `${t(navKey)} – Viesulai` };
  };
