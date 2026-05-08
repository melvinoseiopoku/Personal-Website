import { ScrollTiltedGrid } from "@/components/ui/scroll-tilted-grid";

export default function DemoOne() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-medium tracking-tight">
          A full person, not just a CV
        </h1>
        <p className="mt-4 max-w-md text-sm opacity-60">
          Research, product design, family, salsa, soccer, running, and the story around the work.
        </p>
      </section>

      <ScrollTiltedGrid loop />
    </main>
  );
}
