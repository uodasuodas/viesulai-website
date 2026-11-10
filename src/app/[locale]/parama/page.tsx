import { setRequestLocale } from "next-intl/server";
import { Support } from "@/components/support";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("support");

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <Support />
    </main>
  );
}
