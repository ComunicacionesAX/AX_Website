# AX Website

Landing site for Asimetrix (AX), built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

## Requirements

- Node.js ≥ 18.18
- npm ≥ 9

## Setup

```bash
npm install
```

## Scripts

| Script          | What it does                                         |
| --------------- | ---------------------------------------------------- |
| `npm run dev`   | Start the dev server with HMR at http://localhost:3000 |
| `npm run build` | Production build                                     |
| `npm run start` | Serve the production build                           |
| `npm run lint`  | Run ESLint (`eslint-config-next`)                    |

If port 3000 is taken, Next will pick another free port automatically, or run `npm run dev -- -p 4000` to force one.

## Structure

```
src/
├── app/                    App Router entry
│   ├── layout.tsx          Root layout
│   ├── page.tsx            Home page
│   ├── globals.css         Global styles (Tailwind)
│   ├── insylo/             /insylo
│   ├── nodos/              /nodos
│   ├── pigvision/          /pigvision
│   └── poder-del-saber/    /poder-del-saber
└── components/             Shared and per-product components
public/images/              Static assets
```

The `@/*` path alias maps to `src/*` (see `tsconfig.json`).
