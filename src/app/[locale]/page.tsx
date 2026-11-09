import { existsSync, readdirSync } from "fs";
import { join, parse } from "path";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Programs } from "@/components/programs";
import { Join } from "@/components/join";
import { Support } from "@/components/support";
import { Video } from "@/components/video";
import { Gallery } from "@/components/gallery";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

// Lists jpg/png/webp files in public/<dir> at build time, sorted by name
const listImages = (dir: string): string[] => {
  const path = join(process.cwd(), "public", dir);
  return (existsSync(path) ? readdirSync(path) : [])
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/${dir}/${f}`);
};

const galleryPhotos = listImages("images/gallery");
// File name (without extension) must match a program key, e.g. images/programs/training.jpg
const programPhotos = Object.fromEntries(
  listImages("images/programs").map((p) => [parse(p).name, p]),
);

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
        <Programs photos={programPhotos} />
        {galleryPhotos.length > 0 && <Gallery photos={galleryPhotos} />}
        <Join />
        <Support />
        <Video />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
