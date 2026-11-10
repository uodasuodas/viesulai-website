import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { ProgramsTeaser } from "@/components/programs";
import { Gallery } from "@/components/gallery";
import { galleryPhotos } from "@/lib/images";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <ProgramsTeaser />
      <Gallery photos={galleryPhotos} />
    </main>
  );
}
