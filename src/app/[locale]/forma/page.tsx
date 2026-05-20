import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/contact";

export default async function FormaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <a href={`/${locale}/`} className="font-display text-bone text-2xl tracking-[0.15em] uppercase">
            Viesulai
          </a>
          <p className="text-bone/40 text-sm mt-2">
            {locale === "lt"
              ? "Garb\u0117s sargybos kuopos tre\u010Diasis b\u016brys"
              : "Third squad of the Honor Guard company"}
          </p>
        </div>
        <div className="border border-bone/10 p-6 md:p-8">
          <h1 className="font-display text-2xl text-bone mb-6 uppercase tracking-wide text-center">
            {locale === "lt" ? "Tapk nariu" : "Join us"}
          </h1>
          <ContactForm standalone />
        </div>
      </div>
    </div>
  );
}
