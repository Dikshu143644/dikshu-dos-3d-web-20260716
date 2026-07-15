import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import InteractiveSelector from "@/components/ui/interactive-selector";

export const metadata: Metadata = {
  title: "Dikshu - Suites & Spaces",
};

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
