# Contributing

Contributions are welcome. Please keep scientific data separate from rendering code and identify every new dataset's source, coordinate frame, units, retrieval date, and coverage limits.

## Development

```sh
pnpm install
pnpm dev
```

Before opening a pull request, run:

```sh
pnpm test
pnpm build
```

Do not commit `node_modules`, `dist`, local caches, credentials, or generated archives. Keep planned trajectories visually distinct from historical trajectories, avoid extrapolating beyond authoritative coverage, and label visual exaggeration clearly.

By contributing, you agree that your contribution may be distributed under the project's MIT License.
