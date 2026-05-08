# React, shadcn, Tailwind, and TypeScript Setup

This repository was originally plain static HTML/CSS, so it did not support React components, shadcn structure, Tailwind CSS, or TypeScript.

I added a shadcn-compatible project structure:

- Components path: `/components/ui`
- Utility path: `/lib/utils.ts`
- React entry: `/src/main.tsx`
- React app shell: `/src/App.tsx`
- Tailwind styles: `/src/index.css`
- Vite entry HTML: `/react-app.html`

The `/components/ui` folder matters because shadcn components and most generated examples assume imports like:

```tsx
import { Button } from "@/components/ui/button";
```

Keeping that path avoids import churn when adding more shadcn components later.

## Install

This environment has Node available, but `npm`, `pnpm`, and `yarn` were not available on the shell path, so dependencies could not be installed here. On a normal machine, run:

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:5173/react-app.html
```

## shadcn CLI Setup Alternative

If starting from scratch, use:

```bash
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init
npm install framer-motion lucide-react @radix-ui/react-slot class-variance-authority clsx tailwind-merge
```

Choose `/components/ui` as the component path during shadcn setup.
