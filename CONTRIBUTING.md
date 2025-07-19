# Contributing to MicroSaaS Boilerplate

Thanks for your interest in improving this project!

---

## Local Setup

```bash
yarn install
yarn dev
```

To run tests:

```bash
yarn test
```

To run linting and formatting:

```bash
yarn lint
yarn typecheck
```

---

## Conventions

- Use Tailwind utility classes when possible
- Keep things server-first (RSC + Server Actions)
- Use TypeScript strictly
- Follow the modular structure: `modules/[feature]/ui/`, `hooks/`, `serverActions/`, `types/`
- All server actions must be wrapped with `withAccess` or `withPermission` middleware
- Components consume data through hooks — no direct server action imports in UI
- Validate inputs with Zod schemas

---

## License

This project is licensed under MIT. By contributing, you agree to license your contributions under the same terms.
