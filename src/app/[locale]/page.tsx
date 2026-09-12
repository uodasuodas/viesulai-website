import { existsSync, readdirSync } from "fs";
import { join } from "path";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Join } from "@/components/join";
import { Support } from "@/components/support";
import { Video } from "@/components/video";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

// Drop jpg/png/webp files into public/images/gallery — they are listed at build time, sorted by name
const GALLERY_DIR = "images/gallery";
const galleryPath = join(process.cwd(), "public", GALLERY_DIR);
const galleryPhotos = (existsSync(galleryPath) ? readdirSync(galleryPath) : [])
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort()
  .map((f) => `/${GALLERY_DIR}/${f}`);

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header hasGallery={galleryPhotos.length > 0} />
      <main>
        <Hero />
        <About />
        <Mission />
        <Join />
        <Support />
        <Video />
        {galleryPhotos.length > 0 && <Gallery photos={galleryPhotos} />}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
