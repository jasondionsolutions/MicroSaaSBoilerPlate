# MicroSaaS Boilerplate

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Playwright](https://img.shields.io/badge/Tested%20with-Playwright-45ba63?logo=playwright&logoColor=white)](https://playwright.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A production-ready **Next.js 16**, **React 19**, and **Tailwind CSS v4** starter template for building MicroSaaS applications.

- Radix UI + `class-variance-authority` (CVA)
- Dark mode support via `next-themes`
- Fully configured Tailwind CSS v4 (JIT, semantic colors, font vars)
- Modular feature architecture with Server Actions + RBAC middleware
- Prisma ORM + MongoDB Atlas
- TanStack React Query for client state
- Zod for validation
- Playwright for end-to-end testing
- Prettier + Tailwind plugin + ESLint Flat Config

---

## Stack Overview

| Layer | Tech |
|-------|------|
| Framework | [Next.js 16](https://nextjs.org/docs) (App Router) |
| UI Primitives | [Radix UI](https://www.radix-ui.com/primitives) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/docs) |
| Database | [Prisma ORM](https://www.prisma.io/) + MongoDB Atlas |
| State Management | [TanStack React Query](https://tanstack.com/query) |
| Validation | [Zod](https://zod.dev/) |
| Auth (placeholder) | AWS Cognito with RBAC middleware |
| Fonts | Geist Sans + Mono via `next/font/google` |
| Dark Mode | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| Buttons + Variants | `class-variance-authority` + `clsx` + `tailwind-merge` |
| Testing | [Playwright](https://playwright.dev/) |
| Linting/Formatting | ESLint Flat Config + Prettier + Tailwind Plugin |

---

## Getting Started

```bash
cp .env.example .env          # configure your database URL
yarn install                  # install dependencies
yarn db:generate              # generate Prisma client
yarn dev                      # start dev server (Turbopack)
```

### Other Commands

```bash
yarn build                    # production build
yarn lint                     # run ESLint
yarn typecheck                # run TypeScript checks
yarn test                     # run Playwright e2e tests
yarn test:ui                  # interactive Playwright runner
yarn db:push                  # push schema changes to database
yarn db:studio                # open Prisma Studio GUI
```

---

## Architecture

### Modular Feature Structure

All features are isolated under `modules/[feature]/` with strict layer separation:

```
modules/[feature]/
  ui/              # Client components (UI only)
  hooks/           # Client hooks (TanStack Query, bridge to server actions)
  serverActions/   # Server actions (RBAC-wrapped, all business logic)
  types/           # Zod schemas, TypeScript types
  lib/             # Feature-local utilities
  services/        # Business logic orchestration (if needed)
```

### Architecture Layers

1. **Components (UI only)** - Consume data from hooks, no direct server action calls
2. **Hooks** - Bridge layer that calls server actions and manages client state
3. **Server Actions** - All calculations, algorithms, processing, database operations
4. **Middleware** - `withAccess` (basic auth) and `withPermission` (strict RBAC)

### Server Action Example

```typescript
// Server action with RBAC
export const createItem = withAccess(async (
  user: AuthContext,
  input: CreateItemInput
) => {
  const validated = createItemSchema.parse(input);
  const item = await prisma.item.create({
    data: { ...validated, createdById: user.userId }
  });
  return { data: item, success: true };
});
```

```typescript
// Hook (bridge between UI and server action)
export function useCreateItem() {
  return useMutation({
    mutationFn: (input: CreateItemInput) => createItem(input),
    onError: (e) => toast.error(e.message),
    onSuccess: () => toast.success("Item created")
  });
}
```

```typescript
// Component (UI only, consumes hook)
function ItemForm() {
  const { mutate: createItem, isPending } = useCreateItem();
  // UI only - no direct server action imports
}
```

---

## Project Structure

```
.
├── app/                      # Next.js App Router pages and layouts
├── components/               # Global providers and shared UI
│   └── ui/                   # shadcn/ui components (button, dropdown, etc.)
├── modules/                  # Feature modules
│   └── example/              # Example module showing the pattern
│       ├── ui/               # Feature components
│       ├── hooks/            # Client hooks
│       ├── serverActions/    # RBAC-wrapped server actions
│       └── types/            # Zod schemas and types
├── lib/                      # Global utilities
│   ├── auth/                 # Auth types and session validation
│   └── middleware/           # withAccess, withPermission
├── schema/                   # Prisma schema (schema.prisma)
├── tests/                    # Playwright e2e tests
├── types/                    # Global TypeScript types
└── public/                   # Static assets
```

---

## Development Workflow

1. Define Prisma model in `schema/schema.prisma`
2. Create Zod schema in `modules/[feature]/types/`
3. Create RBAC-wrapped server actions in `modules/[feature]/serverActions/`
4. Create typed client hooks in `modules/[feature]/hooks/`
5. Build UI components that consume hooks
6. Write Playwright tests

---

## License

MIT
