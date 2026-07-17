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
