import { useTranslations } from "next-intl";

const YOUTUBE_ID = "GEIEZnZtmk0";

// Public Instagram reel/post URLs, e.g. "https://www.instagram.com/reel/ABC123xyz/"
const INSTAGRAM_URLS: string[] = [];

// Rendered inside the gallery section, below the photo carousel
export function Video() {
  const t = useTranslations("video");

  return (
    <>
      <div className="relative w-full aspect-video bg-dark-light">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}`}
          title={t("title")}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {INSTAGRAM_URLS.length > 0 && (
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {INSTAGRAM_URLS.map((url) => (
            <iframe
              key={url}
              src={`${url.replace(/\/?$/, "/")}embed/`}
              title="Instagram"
              allow="encrypted-media"
              className="w-[328px] h-[580px] border border-bone/10 bg-dark"
            />
          ))}
        </div>
      )}
    </>
  );
}
