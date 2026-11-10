import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("about");

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <About />
      <Mission />
    </main>
  );
}
