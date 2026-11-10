import { setRequestLocale } from "next-intl/server";
import { Join } from "@/components/join";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("join");

export default async function JoinPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <Join />
    </main>
  );
}
