import type { Metadata } from "next";
import HorizontalPOVSection from "@/components/story/HorizontalPOVSection";
import StructuredData from "@/components/StructuredData";
import { createPageMetadata, siteConfig, websiteJsonLd } from "@/lib/seo";

const storyRoute = siteConfig.routes.find((route) => route.path === "/story");

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  title: storyRoute?.title,
  description: storyRoute?.description,
  path: "/story",
  image: "/resort-designs/six-senses-thailand.jpg",
});

export default function StoryPage() {
  return (
    <>
      <StructuredData data={websiteJsonLd()} />
      <HorizontalPOVSection />
    </>
  );
}
