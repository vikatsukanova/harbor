# Harbor

A content-site design system for learning the work in a Foundation design-systems contract: Figma tokens, SCSS components, Storybook, accessibility checks, and visual regression.

The production library from client work can stay private. This repo is the same pipeline, small enough to click through.

## Run it

```bash
npm install
npx playwright install chromium
npm run storybook
```

Storybook opens at http://localhost:6006. Start with Foundations, then Components, then the Article pattern.

```bash
npm test
```

That runs the Figma converter test, checks the generated CSS is committed, builds Storybook, then runs accessibility, keyboard, and visual tests.

## The loop

1. Tokens live in `tokens/tokens.json`, in the Tokens Studio shape: `primitive`, then `semantic`, then `component`. A semantic token references a primitive, for example `{primitive.color.sea}`. It does not repeat the hex value.
2. `npm run tokens` runs Style Dictionary and writes `src/styles/_tokens.scss`. Primitive names keep a prefix (`--primitive-color-sea`). Semantic names are the ones components use (`--color-background-accent`), and they point at primitives with `var()`.
3. `src/styles/global.scss` loads those variables, then Foundation, then each component.
4. Stories render the HTML functions. Playwright opens those same stories for axe, keyboard behavior, and screenshots.

`npm run tokens:watch` rebuilds the CSS whenever the JSON changes. Storybook hot-reloads the file.

## Connect Figma

Two ways in, one file out.

**Tokens Studio, any Figma plan.** Install the plugin, create three sets named `primitive`, `semantic`, and `component`, and use the same names as this JSON. Push or export onto `tokens/tokens.json`, then run `npm run tokens`. This is the path most teams use.

**Figma variables API, Enterprise only.** The local variables endpoint is not on Pro or Org plans.

```bash
FIGMA_TOKEN=your-personal-token FIGMA_FILE_KEY=the-file-key npm run figma:pull
npm run tokens
```

Name variables with slashes, and put them in collections named `primitive` and `semantic`:

- `color/ink/900` in the primitive collection
- `color/text/primary` in the semantic collection, aliased to the primitive

`scripts/pull-figma.js` converts that payload. `npm run test:figma` checks the converter against `scripts/fixtures/figma-variables.json`, so you can read the mapping without a Figma account.

In Figma, bind the components' fills and text styles to those variables. The file and the repo then use the same names. When a variable changes, pull, rebuild tokens, and look at the Article story.

## Foundation

Foundation 6 is the grid and a few utilities, not the look of the components.

- `grid-container`, `grid-x`, `grid-margin-x`, and `cell large-8` / `cell large-4` build the article page. Below the large breakpoint (1024px) a cell is full width.
- `hide-for-large` hides the menu button from the large breakpoint up.
- `@include breakpoint(large)` in SCSS is Foundation's media-query mixin.
- The accordion story is Foundation's own component, including its jQuery plugin. The trigger is an anchor because that is what Foundation ships. New disclosures are buttons. That gap is the kind of discrepancy you would fix on a live site.

`src/styles/settings.scss` is read by Foundation at compile time. `$primary-color` has to be a real color, because Foundation runs it through Sass color functions. It duplicates `primitive.color.sea`. If you change the token and forget the setting, the accordion drifts from the buttons. The accordion screenshot is there to catch that.

## Accessibility and visual tests

Accessibility is not a Storybook feature. Storybook renders one example. The tests open that example.

- `tests/a11y.spec.js` runs axe against `#storybook-root` for every id in `tests/stories.js`. That is the gate. The Accessibility tab in Storybook runs the same scan while a story is open, so a violation stays visible until someone fixes it. The Playwright run opens each story with Storybook's manual global so the two scans do not start axe at the same time.
- `tests/behavior.spec.js` tabs and presses keys: Enter opens a disclosure, Escape closes it and returns focus. The phone-width header does the same for the menu.
- `tests/visual.spec.js` screenshots the story root. The first run needs baselines: `npm run test:visual:update`. After a real visual change, look at the diff, then update. A token change that shifts color or spacing should fail these until you accept it.

WCAG 2.2 AA shows up in the components as contrast (axe), names and roles (axe), a visible focus ring, and a 2.75rem target. Disabled controls are exempt from contrast. Placeholder and muted text are still checked, which is why those colors are darker than a typical gray.

## A practice hour

1. In `tokens/tokens.json`, change `primitive.color.sea` from `#11443e` to `#1d4e89`.
2. Run `npm run tokens` and refresh the Button story. Primary buttons and the focus ring should move together. The accordion will not, until you update `$primary-color` in `settings.scss`.
3. Run `npm run test:a11y`. It should still pass. Then set `primitive.color.muted` to `#c8c2b6` and run the tests again. Axe should fail contrast on the card body and the field hint. Put the color back.
4. Run `npm run test:visual`. The button and article screenshots fail. That is the signal that a token change reached the page. Restore the original sea color, rebuild tokens, and the baselines match again.

## Where things go

| Path | Role |
| --- | --- |
| `tokens/tokens.json` | Source of truth, Tokens Studio shape |
| `scripts/build-tokens.js` | JSON to CSS variables |
| `scripts/pull-figma.js` | Figma variables API to that JSON |
| `src/styles/global.scss` | Foundation plus component CSS |
| `src/components/*` | Markup function, SCSS, story |
| `src/patterns/article` | A page made of those components |
| `tests/stories.js` | Which stories get checked |
