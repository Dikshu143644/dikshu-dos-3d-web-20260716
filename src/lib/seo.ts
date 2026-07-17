import type { Metadata } from "next";

export const siteConfig = {
  name: "Dikshu",
  company: "DOS",
  developer: "Dikshu",
  url: "https://dikshu-dos-3d-web-20260716.vercel.app",
  description:
    "Dikshu by DOS is a cinematic luxury resort experience with immersive suites, refined dining, curated services and scroll-driven visual storytelling.",
  keywords: [
    "Dikshu",
    "DOS",
    "luxury resort",
    "luxury stay",
    "resort experience",
    "spa retreat",
    "private villa",
    "hospitality design",
    "cinematic resort website",
  ],
  ogImage: "/resort-designs/tropical-mansion.jpg",
  contact: {
    email: "omkardsupe143644@gmail.com",
    phonePrimary: "+917666971183",
    phoneSecondary: "+917276661915",
    whatsapp: "https://wa.me/917666971183",
    github: "https://github.com/Dikshu143644",
    instagram: "https://www.instagram.com/_omkar_d_supe_/",
    linkedin: "https://www.linkedin.com/in/omkar-supe-14u644/",
  },
  lastUpdated: "2026-07-17",
  routes: [
    {
      path: "/",
      title: "Dikshu by DOS",
      description:
        "Explore Dikshu, a cinematic DOS luxury resort experience shaped around suites, gallery spaces, dining, services and reservation storytelling.",
      priority: 1,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/experiences",
      title: "Suites & Spaces",
      description:
        "Discover the suites, spaces and curated interiors that define the Dikshu luxury resort experience by DOS.",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/gallery",
      title: "Gallery",
      description:
        "View the Dikshu gallery of resort designs, villas, retreat spaces and luxury hospitality details by DOS.",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/story",
      title: "The Journey",
      description:
        "Move through the Dikshu visual journey with cinematic resort storytelling created for the DOS experience.",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ],
};

export function absoluteUrl(path = "") {
  if (!path) return siteConfig.url;
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
}: PageMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} by ${siteConfig.company}`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: pageTitle,
    description,
    keywords: siteConfig.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description,
      url,
      siteName: `${siteConfig.name} by ${siteConfig.company}`,
      images: [
        {
          url: imageUrl,
          alt: `${siteConfig.name} luxury resort experience by ${siteConfig.company}`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.company,
    url: siteConfig.url,
    email: siteConfig.contact.email,
    telephone: [siteConfig.contact.phonePrimary, siteConfig.contact.phoneSecondary],
    sameAs: [siteConfig.contact.github, siteConfig.contact.instagram, siteConfig.contact.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Reservations",
        telephone: siteConfig.contact.phonePrimary,
        email: siteConfig.contact.email,
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "WhatsApp booking",
        url: siteConfig.contact.whatsapp,
        availableLanguage: ["en"],
      },
    ],
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
  };
}

export function lodgingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Resort",
    name: `${siteConfig.name} by ${siteConfig.company}`,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: [siteConfig.contact.phonePrimary, siteConfig.contact.phoneSecondary],
    sameAs: [siteConfig.contact.github, siteConfig.contact.instagram, siteConfig.contact.linkedin],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Luxury suites",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Curated dining",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Personalized resort services",
        value: true,
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} by ${siteConfig.company}`,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.company,
    },
  };
}
