import { site } from "#/features/header/constant";
import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube, MapPin, Accessibility } from "lucide-react";
// footer.config.ts

export type FooterLink =
  | { label: string; to: string; external?: false }

export type FooterSocial = {
  label: string;
  href: string;
  icon: any;
};

export const footerConfig = {
  help: {
    title: "Ai nevoie de ajutor?",
    links: [
      { label: "Serviciul Clienți", to: "/contact" },
      { label: "Formular de contact", to: "/contact/form" },
    ] as FooterLink[],

    phone: {
      label: "+40 316301973",
      href: "tel:+40316301973",
    },

    hours: "luni - vineri 9:00 - 16:00",

    email: {
      label: "info.ro@gate.shop",
      href: "mailto:info.ro@gate.shop",
    },
  },

  conditions: {
    title: "Condiții",
    links: [
      { label: "Politica de confidențialitate", to: "/privacy" },
      { label: "Cookies", to: "/cookies" },
      { label: "Termeni și condiții", to: "/terms" },
    ] as FooterLink[],
  },

  social: {
    title: "Social media",
    links: [
      {
        label: "Facebook",
        href: "https://facebook.com",
        icon: Facebook,
      },
      {
        label: "Instagram",
        href: "https://instagram.com",
        icon: Instagram,
      },
      {
        label: "YouTube",
        href: "https://youtube.com",
        icon: Youtube,
      },
    ] as FooterSocial[],
  },
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* HELP */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              {footerConfig.help.title}
            </h3>

            <ul className="space-y-5 text-sm">
              {footerConfig.help.links.map((item) =>
                "to" in item ? (
                  <li key={item.label}>
                    <Link to={item.to} className="hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ) : null
              )}

              <li className="pt-4 text-base font-bold">
                <a href={footerConfig.help.phone.href}>
                  {footerConfig.help.phone.label}
                </a>
              </li>

              <li className="text-xs">
                {footerConfig.help.hours}
              </li>

              <li className="font-semibold">
                <a href={footerConfig.help.email.href}>
                  {footerConfig.help.email.label}
                </a>
              </li>
            </ul>
          </div>

          {/* CONDITIONS */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              {footerConfig.conditions.title}
            </h3>

            <ul className="space-y-4 text-sm">
              {footerConfig.conditions.links.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="mb-8 text-lg font-semibold">
              {footerConfig.social.title}
            </h3>

            <ul className="space-y-5 text-sm">
              {footerConfig.social.links.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 hover:underline"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-300">
        <div className="py-10 flex flex-col items-center gap-10">
          <div className="text-2xl tracking-[0.35em]">
            {site.name}
          </div>
        </div>
      </div>
    </footer>
  );
}