import { setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/contact";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("contact");

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <Contact />
    </main>
  );
}
