import InteractiveBentoGallery from "@/components/blocks/interactive-bento-gallery";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Connectomics presentation",
    desc: "Princeton Neuroscience Institute poster session",
    url: "/assets/img/motivation-image.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "MIT EEG-MRS",
    desc: "Sleep stage classification and metabolite analysis",
    url: "/assets/img/portfolio/eeg-mrs-lab-7.jpg",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Natural products",
    desc: "Terpene biosynthesis screening at UF",
    url: "/assets/img/portfolio/terpene-lab-3.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "Poster archive",
    desc: "Research communication across programs",
    url: "/assets/img/portfolio/connectome-2.jpg",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "image",
    title: "Project documentation",
    desc: "Publications, reports, and visual outputs",
    url: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "Measurement systems",
    desc: "Hardware and signal acquisition",
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "Biomedical engineering",
    desc: "Tools for understanding the brain",
    url: "https://images.unsplash.com/photo-1559757175-5700dde675bc",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];

export function BentoGridGalleryDemo() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Research Gallery"
        description="Drag and explore selected research images and measurement-system references."
      />
    </div>
  );
}
