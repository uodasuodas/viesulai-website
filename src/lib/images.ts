import { existsSync, readdirSync } from "fs";
import { join, parse } from "path";

// Lists jpg/png/webp files in public/<dir> at build time, sorted by name
const listImages = (dir: string): string[] => {
  const path = join(process.cwd(), "public", dir);
  return (existsSync(path) ? readdirSync(path) : [])
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort()
    .map((f) => `/${dir}/${f}`);
};

export const galleryPhotos = listImages("images/gallery");

// File name (without extension) must match a program key, e.g. images/programs/training.jpg
export const programPhotos: Record<string, string> = Object.fromEntries(
  listImages("images/programs").map((p) => [parse(p).name, p]),
);
