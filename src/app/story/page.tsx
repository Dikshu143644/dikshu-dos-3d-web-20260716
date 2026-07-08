import type { Metadata } from "next";
import HorizontalPOVSection from "@/components/story/HorizontalPOVSection";

export const metadata: Metadata = {
  title: "Viceroy — The Journey",
};

export default function StoryPage() {
  return <HorizontalPOVSection />;
}
