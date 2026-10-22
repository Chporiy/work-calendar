# Work Calendar

## Commands

- Use Node.js 18 LTS or newer and npm (`package-lock.json` is committed).
- `npm run build` compiles `src/` to the ignored `dist/` directory; `npm start` builds first, then runs the interactive CLI from `dist/index.js`.
- `npm test` runs Jest with `src` as its root. Run one suite with `npm test -- model/ModelConstructor.spec.ts` or `npm test -- markup/MarkupConstructor.spec.ts`.
- `npm run lint` runs ESLint with `--fix`, so it can modify source files. Review its changes before keeping them.

## Implementation Notes

- `src/index.ts` is the CLI entrypoint: it reads a human month (1-12), converts it to JavaScript's zero-based month index, builds the calendar model, then prints Redmine wiki table markup.
- `src/model/` owns the Monday-first calendar grid. A `0` is an empty overflow cell; completed weeks must contain seven cells.
- `src/markup/` turns that model into Redmine markup. Output uses the platform EOL (`node:os`), so preserve EOL-aware assertions.
