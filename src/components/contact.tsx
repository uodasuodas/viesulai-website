"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Replace with your Web3Forms access key after registering at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

export function Contact() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "Nauja žinutė iš viesulai.lt",
      from_name: "viesulai.lt",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-dark-light border border-bone/10 px-4 py-3 text-bone placeholder:text-bone/30 focus:outline-none focus:border-sand transition-colors";

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
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
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
              className={inputClass}
            />
            <textarea
              name="message"
              placeholder={t("form.message")}
              required
              rows={5}
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
          </motion.form>

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
