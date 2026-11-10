import { setRequestLocale } from "next-intl/server";
import { Gallery } from "@/components/gallery";
import { galleryPhotos } from "@/lib/images";
import { pageMetadata } from "../page-metadata";

export const generateMetadata = pageMetadata("gallery");

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale);

  return (
    <main className="pt-16">
      <Gallery photos={galleryPhotos} />
    </main>
  );
}
