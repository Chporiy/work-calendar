# Improvement Backlog

## Repository Context

- TypeScript CLI that reads a year and a human-readable month (`1` to `12`), builds a Monday-first calendar grid, and prints Redmine wiki markup.
- `src/model/` owns calendar construction. A `0` represents an overflow cell; every completed week must have seven cells.
- `src/markup/` renders a `CalendarModel` using the platform EOL.
- `src/index.ts` is the executable entry point.
- Use Node.js 18+ and npm. Do not treat ignored `dist/` contents as source of truth.

## Constraints

- This backlog is for reliability, maintainability, testing, tooling, and documentation. Do not add product features unless a task explicitly requires one.
- Preserve the public CLI interaction: prompt for year and month, then write Redmine markup to stdout.
- Keep the month contract unambiguous: CLI input is `1..12`; JavaScript `Date` receives a zero-based month.
- Use `apply_patch` for source edits. Do not revert unrelated worktree changes.

## Priority 1: Input Validation

**Files:** `src/getParamsFromReadline.ts`, new or updated tests

**Problem:** Input is converted with `Number()` without validation. Months outside `1..12` are silently normalized by `Date`; non-numeric input becomes `NaN` and can fail later in model construction.

**Work:**

- Validate year as a finite integer.
- Validate month as a finite integer in the inclusive range `1..12` before converting it to zero-based form.
- Present invalid input as a controlled CLI error or retry, rather than allowing a downstream exception.
- Extract pure parsing/validation logic if that makes the behavior straightforward to test.

**Acceptance criteria:**

- Valid input still produces the same model and markup.
- Blank, non-numeric, fractional, zero, and out-of-range month input is rejected predictably.
- Tests cover valid and invalid parsing paths.

## Priority 2: Safe Process Completion

**Files:** `src/index.ts`

**Problem:** The entry point calls `process.exit()` immediately after `console.log()`. This is unnecessary after closing `readline` and can truncate output redirected to a pipe or file.

**Work:**

- Remove the explicit exit and allow Node to finish naturally.
- Add top-level error handling consistent with the input-validation behavior.

**Acceptance criteria:**

- The process exits successfully after normal output.
- Redirected output is complete.
- Failures are reported without an unhandled rejection.

## Priority 3: Calendar Model Test Coverage

**Files:** `src/model/ModelConstructor.spec.ts`

**Problem:** Existing tests cover a few hand-picked months. Two tests only assert that a duplicated week is absent, which permits many invalid results.

**Work:**

- Replace negative duplicate-week assertions with exact expected values or model invariants.
- Cover leap and non-leap February, year boundaries, every possible weekday on which a month can start, and a six-week month.
- Add reusable assertions for these invariants:
  - every week has exactly seven cells;
  - nonzero values are consecutive from `1` through the number of days in the month;
  - days appear under the correct Monday-first weekday;
  - only leading and trailing overflow cells are zero.

**Acceptance criteria:**

- The model is verified across a representative multi-year range or an equivalent complete set of date cases.
- Tests remain independent of the current local timezone assumptions used by `Date`.

## Priority 4: Build Artifact Hygiene

**Files:** `tsconfig.json`, optionally new `tsconfig.build.json`, `package.json`

**Problem:** `tsconfig.json` includes test files, so `npm run build` emits `*.spec.js` into `dist/`. TypeScript does not clean `outDir`, and the current ignored `dist/` contains stale artifacts from removed or renamed modules.

**Work:**

- Ensure the production build excludes `*.spec.ts` files.
- Clean `dist/` before emitting production artifacts, using a cross-platform-safe approach compatible with supported environments.
- Keep Jest compilation working through its own TypeScript configuration.

**Acceptance criteria:**

- A clean build produces only current runtime artifacts.
- `dist/` has no emitted test files or stale deleted modules.
- `npm start` still builds and runs the CLI.

## Priority 5: Non-Mutating Verification Commands

**Files:** `package.json`

**Problem:** `npm run lint` runs ESLint with `--fix`, so a verification command silently edits the worktree.

**Work:**

- Make `lint` check-only.
- Add a separate opt-in `lint:fix` command.
- Optionally add a check command that runs type checking, linting, and tests without editing files.

**Acceptance criteria:**

- `npm run lint` leaves `git status` unchanged.
- A documented fix command remains available.

## Priority 6: Documentation and Package Metadata

**Files:** `README.md`, `package.json`

**Problem:** The README lacks an input/output example. Package metadata has an empty description and declares `index.ts` as `main`, whereas the executable runs from `dist/index.js`.

**Work:**

- Document prerequisites, run steps, valid month range, and a concise sample of generated markup.
- State that output is written to stdout for pasting into Redmine.
- Decide whether this repository is an application or publishable package, then align `description`, `main`, and any executable metadata with that decision.

**Acceptance criteria:**

- A new contributor can run the CLI and understand its output from the README.
- Package metadata does not point consumers at TypeScript source when compiled JavaScript is intended.

## Verification

Run after each relevant change:

```sh
npm test -- --runInBand
npx tsc --noEmit
npx eslint "./src/**/*.ts"
npm run build
```

Review `git status --short` after linting and building. `dist/` is ignored; inspect it only to confirm build output hygiene, not as a source to edit.
