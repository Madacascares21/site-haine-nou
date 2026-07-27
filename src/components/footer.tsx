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
    <footer className="py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          {/* About + Contact */}
          <div className="w-full lg:w-80 lg:flex-shrink-0 space-y-10 text-center lg:text-left">
            {config.about && (
              <div>
                <h3 className="mb-4 text-xl font-bold sm:text-2xl">
                  {config.about.title}
                </h3>

                <img
                  src={config.about.image}
                  alt={config.about.imageAlt}
                  className="mx-auto h-28 w-28 rounded-full object-cover sm:h-36 sm:w-36 lg:mx-0"
                />
              </div>
            )}

            {config.contact && (
              <div>
                <h3 className="mb-4 text-xl font-bold sm:text-2xl">
                  {config.contact.title}
                </h3>

                <div className="space-y-4">
                  {config.contact.items.map((item) => (
                    <div key={item.label}>
                      <p className="text-sm text-gray-500">{item.label}</p>

                      <div className="flex items-center justify-center gap-2 lg:justify-start">
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
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {config.sections.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-xl font-bold sm:text-2xl">
                  {section.title}
                </h3>

                <div className="h-full rounded-lg bg-black/5 p-5 sm:p-6">
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
          </div>

          {/* Badges */}
          {config.badges && config.badges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-5 lg:w-60 lg:flex-col lg:items-center">
              {config.badges.map((badge) => {
                const image = (
                  <img
                    src={badge.image}
                    alt={badge.alt}
                    className="w-full max-w-[180px] sm:max-w-[220px]"
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
      </div>
    </footer>
  );
}