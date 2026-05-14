import { createFileRoute } from "@tanstack/react-router";
import { Particles } from "@/components/Particles";
import { Cursor } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Menu } from "@/components/Menu";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { About } from "@/components/About";
import { Reservation } from "@/components/Reservation";
import { Footer } from "@/components/Footer";
import { Splash, ScrollProgress } from "@/components/Splash";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Savoria X — Where Flavor Meets Art" },
      { name: "description", content: "Cinematic luxury dining in Chennai. Reserve your table at Savoria X." },
    ],
  }),
});

function Index() {
  return (
    <main className="noise relative">
      <Splash />
      <ScrollProgress />
      <Cursor />
      <Particles count={70} />
      <Navbar />
      <Hero />
      <Stats />
      <Menu />
      <Gallery />
      <Testimonials />
      <About />
      <Reservation />
      <Footer />
    </main>
  );
}
