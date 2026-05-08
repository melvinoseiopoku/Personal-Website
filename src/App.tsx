import { HeroDemo } from "@/components/demos/animated-hero-demo";
import { HeroScrollDemo } from "@/components/demos/container-scroll-demo";
import { BentoGridGalleryDemo } from "@/components/demos/bento-grid-gallery-demo";
import { Button } from "@/components/ui/button";
import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";

const publications = [
  ["2026", "A comparative study of video-based and electromyography-based detection of tics."],
  ["2025", "Discovery of UbiA-Type Cyathane Synthases in Bacteria."],
  ["2025", "Exploring and expanding the natural chemical space of bacterial diterpenes."],
  ["2024", "Characterization of UbiA terpene synthases with a precursor overproduction system."],
];

function App() {
  return (
    <main className="min-h-screen bg-background">
      <HeroDemo />

      <section className="container grid gap-4 md:grid-cols-4 pb-20">
        {[
          ["4", "publications"],
          ["5", "research projects"],
          ["3", "neuroscience labs"],
          ["1", "custom PCB system"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-2xl border bg-white/70 p-6">
            <div className="text-5xl font-black tracking-tighter">{value}</div>
            <div className="text-sm font-semibold text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>

      <HeroScrollDemo />

      <section className="container pb-24">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Publications</p>
            <h2 className="mt-2 max-w-2xl text-4xl font-black tracking-tighter md:text-6xl">Compact, DOI-first research record.</h2>
          </div>
          <Button variant="outline">Download CV</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {publications.map(([year, title]) => (
            <article key={title} className="rounded-2xl border bg-white/70 p-6">
              <p className="text-sm font-black text-teal-800">{year}</p>
              <h3 className="mt-4 text-xl font-bold leading-tight">{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <BentoGridGalleryDemo />

      <section className="py-24">
        <div className="container text-center">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Life</p>
          <h2 className="mx-auto mt-2 max-w-3xl text-4xl font-black tracking-tighter md:text-6xl">
            Professional, but still human.
          </h2>
        </div>
        <ScrollTiltedGrid loop={false} maxWidth="3xl" gap={6} rounded="1rem" />
      </section>
    </main>
  );
}

export default App;
