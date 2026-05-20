"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const WEB3FORMS_ACCESS_KEY = "96e77900-da51-4a15-b013-1e0a9ddb5cc7";

const activityKeys = [
  "tactical",
  "shooting",
  "medical",
  "comms",
  "cyber",
  "other",
] as const;

export function ContactForm({ standalone = false }: { standalone?: boolean }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);

  const toggleActivity = (key: string) => {
    setSelectedActivities((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement)?.value || "";

    const activitiesText = selectedActivities
      .map((k) => t(`form.activitiesOptions.${k}`))
      .join(", ");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Nauja anketa - viesulai.lt",
      from_name: "viesulai.lt",
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      "Dabartine kuopa": get("company"),
      "Laikas per menesi": get("time"),
      "Dominancios veiklos": activitiesText,
      message: get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        form.reset();
        setSelectedActivities([]);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-dark-light border border-bone/10 px-4 py-3 text-bone placeholder:text-bone/30 focus:outline-none focus:border-sand transition-colors";

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="text"
        name="name"
        placeholder={t("form.name")}
        required
        className={inputClass}
      />
      <input
        type="email"
        name="email"
        placeholder={t("form.email")}
        required
        className={inputClass}
      />
      <input
        type="tel"
        name="phone"
        placeholder={t("form.phone")}
        required
        className={inputClass}
      />
      <input
        type="text"
        name="company"
        placeholder={t("form.company")}
        className={inputClass}
      />

      <div>
        <label className="block text-bone/60 text-sm mb-2">
          {t("form.time")}
        </label>
        <select name="time" required className={`${inputClass} appearance-none`}>
          <option value="">{t("form.timeOptions.placeholder")}</option>
          <option value="iki4">{t("form.timeOptions.opt1")}</option>
          <option value="4-10">{t("form.timeOptions.opt2")}</option>
          <option value="10-20">{t("form.timeOptions.opt3")}</option>
          <option value="20+">{t("form.timeOptions.opt4")}</option>
        </select>
      </div>

      <div>
        <label className="block text-bone/60 text-sm mb-3">
          {t("form.activities")}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {activityKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => toggleActivity(key)}
              className={`px-3 py-2 text-sm border transition-colors text-left ${
                selectedActivities.includes(key)
                  ? "border-sand bg-sand/15 text-sand"
                  : "border-bone/10 text-bone/50 hover:border-bone/30"
              }`}
            >
              {t(`form.activitiesOptions.${key}`)}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="message"
        placeholder={t("form.message")}
        rows={3}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={status === "sending"}
        className="border-2 border-sand text-sand hover:bg-sand hover:text-dark px-8 py-3 font-semibold tracking-wide uppercase transition-colors disabled:opacity-50"
      >
        {status === "sending" ? "..." : t("form.submit")}
      </button>

      {status === "success" && (
        <p className="text-green-400 text-sm">{t("form.success")}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">{t("form.error")}</p>
      )}
    </form>
  );

  if (standalone) return formContent;

  return (
    <section id="contact" className="py-24 md:py-32 bg-olive">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-bone mb-4 uppercase tracking-wide">
            {t("title")}
          </h2>
          <p className="text-bone/50 text-lg">{t("subtitle")}</p>
          <div className="w-16 h-0.5 bg-sand mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            {formContent}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl text-bone mb-6 uppercase tracking-wide">
              {t("info.company")}
            </h3>
            <div className="space-y-3 text-bone/60 text-lg">
              <p>{t("info.code")}</p>
              <p>{t("info.address")}</p>
              <p>
                <a
                  href={`tel:${t("info.phone").replace(/\s/g, "")}`}
                  className="hover:text-sand transition-colors"
                >
                  {t("info.phone")}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${t("info.email")}`}
                  className="hover:text-sand transition-colors"
                >
                  {t("info.email")}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export { ContactForm as Contact };
