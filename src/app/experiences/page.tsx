import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InteractiveSelector from "@/components/ui/interactive-selector";
import { createPageMetadata, siteConfig } from "@/lib/seo";

const experiencesRoute = siteConfig.routes.find((route) => route.path === "/experiences");

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = createPageMetadata({
  title: experiencesRoute?.title,
  description: experiencesRoute?.description,
  path: "/experiences",
  image: "/resort-designs/bali-cabin-retreat.jpg",
});

export default function ExperiencesPage() {
  return (
    <>
      <Navbar revealed />
      <main>
        <InteractiveSelector />
      </main>
    </>
  );
}
