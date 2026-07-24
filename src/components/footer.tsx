import React from "react";

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterContactItem {
  label: string;
  value: string;
  copyable?: boolean;
  href?: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterBadge {
  image: string;
  alt: string;
  href?: string;
}

export interface FooterConfig {
  about?: {
    title: string;
    image: string;
    imageAlt?: string;
  };

  contact?: {
    title: string;
    items: FooterContactItem[];
  };

  sections: FooterSection[];

  badges?: FooterBadge[];
}

interface FooterProps {
  config: FooterConfig;
}

export default function Footer({ config }: FooterProps) {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className=" py-14">
      <div
        className="mx-auto grid max-w-7xl gap-10 px-6"
        style={{
          gridTemplateColumns: `1.2fr repeat(${config.sections.length}, 1fr) 0.9fr`,
        }}
      >
        {/* About + Contact */}
        <div className="space-y-10">
          {config.about && (
            <div>
              <h3 className="mb-5 text-2xl font-bold">
                {config.about.title}
              </h3>

              <img
                src={config.about.image}
                alt={config.about.imageAlt}
                className="h-36 w-36 rounded-full object-cover"
              />
            </div>
          )}

          {config.contact && (
            <div>
              <h3 className="mb-5 text-2xl font-bold">
                {config.contact.title}
              </h3>

              <div className="space-y-4">
                {config.contact.items.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm text-gray-500">{item.label}</p>

                    <div className="flex items-center gap-2">
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-semibold hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-semibold">{item.value}</span>
                      )}

                      {item.copyable && (
                        <button
                          onClick={() => copyToClipboard(item.value)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Copiază
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Link Sections */}
        {config.sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-5 text-2xl font-bold">
              {section.title}
            </h3>

            <div className="rounded-md bg-black/5 p-6">
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={
                        link.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center gap-2 hover:underline"
                    >
                      <span>▪</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        {/* Badges */}
        {config.badges && (
          <div className="flex flex-col items-center gap-5">
            {config.badges.map((badge) => {
              const image = (
                <img
                  src={badge.image}
                  alt={badge.alt}
                  className="max-w-[240px]"
                />
              );

              return badge.href ? (
                <a
                  key={badge.alt}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {image}
                </a>
              ) : (
                <div key={badge.alt}>{image}</div>
              );
            })}
          </div>
        )}
      </div>
    </footer>
  );
}