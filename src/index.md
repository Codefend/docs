---
layout: home
title: Source code obfuscation examples and guides
description: Protect Any Source Code with Codefend. Explore C#, C++, Python, Java, JavaScript, SQL, and Arduino examples, and add obfuscation to your existing build tools.

hero:
  name: Codefend
  text: Protect Any Source Code
  tagline: Make your code harder to read. Add a layer of obfuscation.
  actions:
    - theme: brand
      text: Get Started
      link: /get-started/introduction
    - theme: alt
      text: Language Examples
      link: /examples/list#languages
    - theme: alt
      text: Build Integrations
      link: /examples/list#bundlers

features:
  - title: Popular languages
    details: Start with C#, C++, Python, Java, JavaScript, or SQL. Each guide shows the source, settings, and result.
    link: /examples/list#languages
    linkText: View examples
  - title: Migrate your project with AI
    details: Copy a prompt to help your coding assistant adopt Codefend's naming conventions, update references, and preserve external interfaces.
    link: /basic-usage/naming-conventions/ai-assisted-migration
    linkText: Get the AI migration prompt
  - title: Build integrations
    details: Add Codefend to your Vite, esbuild, Rollup, or Webpack build. Keep the tools and plugins your project already uses.
    link: /examples/list#bundlers
    linkText: See build guides
  - title: Two layers of obfuscation
    details: Rename selected names with Codefend, then run your existing uglifier or obfuscator. Add another layer to the same build.
    link: /advanced-usage/multi-layer-obfuscation
    linkText: Learn more
  - title: Choose what to rename
    details: Mark the names you own and choose how to replace them. Keep library names and public APIs unchanged.
    link: /advanced-usage/parser/overview
    linkText: Explore naming rules
  - title: Arduino sketches
    details: Rename your own sketch variables and functions. Keep setup(), loop(), and Arduino library names, then compile and test the result.
    link: /examples/arduino
    linkText: View Arduino example
  - title: Fit your workflow
    details: Run Codefend from the command line, a build script, or CI. Test the generated code before you share it.
    link: /distribution/build-and-deployment
    linkText: Read the workflow guide
---
