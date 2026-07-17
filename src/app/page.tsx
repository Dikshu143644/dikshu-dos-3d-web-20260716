import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import HomeExperience from "@/components/HomeExperience";
import {
  createPageMetadata,
  lodgingJsonLd,
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from "@/lib/seo";

const homeRoute = siteConfig.routes.find((route) => route.path === "/");

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  title: "Luxury Resort Experience",
  description: homeRoute?.description,
  path: "/",
});

export default function Home() {
  return (
    <>
      <StructuredData data={[organizationJsonLd(), websiteJsonLd(), lodgingJsonLd()]} />
      <HomeExperience />
    </>
  );
}
