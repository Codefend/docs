---
title: C# source obfuscation with Codefend
description: Rename application-owned C# helpers with Codefend and run both source files directly with .NET 10, preserving Main and public contracts.
---

# Obfuscate C# source

Codefend can rename selected identifiers in C# source before compilation. This example calculates an order total, keeping `Program`, `Main`, and `Console.WriteLine` unchanged. It transforms source text; it is not a .NET assembly obfuscator.

## 1. Create the source

Install [Node.js](/get-started/installation) and a [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). Install Codefend once on your development computer:

```sh
npm install --global codefend
```

Create `source/Program.cs`:

<<< @/resources/languages/csharp/source/Program.cs{csharp}

### Expected obfuscated source

With the configuration in the next step, Codefend produces:

<<< @/resources/languages/csharp/obfuscated/Program.cs{csharp}

The program's expected output remains `75`. Generated identifier numbers can change when the source or Codefend version changes.

Only the private helper and its parameters use `l_`. Preserve public entry points and library APIs. This standalone .NET 10 example needs no `.csproj`, `package.json`, or npm project initialization.

## 2. Configure Codefend

Create `.codefendrc.json` alongside the `source` directory:

<<< @/resources/languages/csharp/codefend.config.json

The custom rule makes `l_` an explicit selection convention for application-owned names. It avoids discovering unrelated underscore names such as `LED_BUILTIN`, which the broader `codeOnly` rule would select. This narrows discovery rather than providing syntax-aware renaming; read [why these examples use a custom parser](/advanced-usage/parser/custom-naming-convention) and its replacement limitations.

The custom regex selects this example's `l_` names. Plain `Program.cs` does not match the rule, so its filename stays unchanged. The default empty pool uses generated `Ox` names.

Keep `source` text-only and reserve sibling `release` for generated files: Codefend removes an existing output directory. See [output-directory guidance](/basic-usage/obfuscation).

## 3. Run both source versions

Run from the project root:

```sh
dotnet run --file source/Program.cs
codefend --obfuscate
dotnet run --file release/Program.cs
```

Both programs should print:

```text
75
```

The .NET 10 SDK's [file-based app support](https://learn.microsoft.com/en-us/dotnet/core/sdk/file-based-apps#run-applications) compiles and runs each file directly, keeping build outputs in its temporary cache by default. `release/Program.cs` contains the generated helper and parameter names. Exact numbering is an implementation detail.

## Applying this to a larger C# application

For an existing `.csproj` application, keep its normal project and build workflow. This single-file example avoids project setup; it does not replace the configuration required by a larger application.

Keep names used by reflection, serializers, model binding, dependency injection, public APIs, P/Invoke, and framework conventions stable unless all callers are intentionally updated. A private declaration alone does not prove that a name is safe to change.

Codefend matches text, including comments and string contents; it does not understand C# symbols or resolve reflection calls. Compile and test the generated application. Source obfuscation does not secure embedded credentials or transform existing DLLs. Review [current limitations](/distribution/troubleshooting) before processing multiple source files or adding replacement pools.

## Add Codefend to your workflow

Place Codefend before compilation in your build script or CI job. The single-file example can use the command below. For an existing solution, keep the normal project configuration and arrange for its build and tests to consume the generated source rather than the original files.

```sh
codefend --obfuscate
dotnet run --file release/Program.cs
```

In CI, stop on a failed step and package only validated generated output. See [build and deployment](/distribution/build-and-deployment) for the shared workflow.
