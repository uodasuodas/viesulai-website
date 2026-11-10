import { setRequestLocale } from "next-intl/server";
import { Programs } from "@/components/programs";
import { programPhotos } from "@/lib/images";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("programs");

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <Programs photos={programPhotos} />
    </main>
  );
}
