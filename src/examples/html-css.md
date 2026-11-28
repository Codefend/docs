---
title: HTML and CSS class obfuscation
description: Use Codefend to rename an application-owned CSS class consistently across HTML and CSS while preserving filenames and standard browser attributes.
---

# HTML and CSS class obfuscation

Requires Codefend **3.3.0 or later** for the [recommended `m_` preset](/advanced-usage/parser/presets).

HTML and CSS use names shared across files. This example renames an application-owned class in the HTML and its stylesheet together. It preserves the stylesheet path, element names, and browser attributes.

## 1. Create the page and stylesheet

Install [Node.js and Codefend](/get-started/installation) in a new project directory:

```sh
npm install --global codefend
```

Create `source/index.html`:

<<< @/resources/languages/htmlcss/source/index.html

Create `source/styles.css`:

<<< @/resources/languages/htmlcss/source/styles.css

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

::: code-group

<<< @/resources/languages/htmlcss/obfuscated/index.html

<<< @/resources/languages/htmlcss/obfuscated/styles.css

:::

The generated page should still display a bold `42`; the HTML class and CSS selector stay aligned. Generated identifier numbers can change when the source or Codefend version changes.

Open `source/index.html` in a browser. It should display a bold `42`. The `m_result` class belongs to this example; standard attributes and CSS properties remain unchanged.

## 2. Configure both files together

Save `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/htmlcss/codefend.config.json

The `startWithMAndUnderscore` preset selects this example's `m_` names, leaving unrelated underscore names alone. See [parser presets](/advanced-usage/parser/presets) for the exact rule and why we recommend this convention.

Both files are processed with one shared runtime. The `startWithMAndUnderscore` preset selects the same class text in each file. Keep the default empty pool to avoid the current cross-file pool-allocation limitations. Plain filenames such as `index.html` and `styles.css` do not match this rule.

`release` is disposable sibling output: Codefend removes existing output before copying. Keep images, fonts, and other binary assets outside this source-only example and copy them separately in a real build.

## 3. Generate and compare

```sh
codefend --obfuscate
```

Open `release/index.html` in the browser. It should display the same bold `42`. Inspect both generated files: the class used by the paragraph must match the selector in `styles.css`, and the stylesheet link must still resolve.

See [HTML class attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/class) and [CSS class selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/Class_selectors).

## Keep selectors and callers aligned

Only rename classes and IDs controlled by the same build. Keep classes supplied by frameworks, browser automation, external stylesheets, public components, or third-party JavaScript stable. If JavaScript selects an obfuscated class, its string reference must participate in the same mapping workflow too.

This text transformation does not parse browser syntax or coordinate separate toolchains automatically. Check case variants, longer names containing a selected name, dynamic class construction, accessibility references, and your generated page's behavior. See [troubleshooting](/distribution/troubleshooting).

For a bundled application, start with the [Vite guide](/examples/vite), then explicitly verify any names shared across HTML, CSS, and JavaScript.

## Add Codefend to your workflow

Run Codefend before packaging the static site, then run browser and selector checks against the generated HTML and CSS together. Copy binary assets separately and verify the final site with those assets in place.

```sh
codefend --obfuscate
```

For this example, open `release/index.html` during that review and confirm its stylesheet loads and the result is still bold. Your existing site build can package the validated `release` files.

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
