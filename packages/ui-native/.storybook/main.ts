import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import type { StorybookConfig } from "@storybook/react-vite";

const require = createRequire(import.meta.url);

// Absolute path to the ESM bridge that re-exports `react-native-css/components`
// wrappers (for className → $$css conversion on web) plus the non-visual APIs
// from `react-native-web`.
const RN_BRIDGE_PATH = fileURLToPath(
  new URL("./rn-web-bridge.ts", import.meta.url)
);
// Real `react-native-web` entry — used inside `react-native-css` internals to
// break the alias cycle when those files import from `react-native`.
const RN_WEB_PATH = require.resolve("react-native-web");

// Rewrites every `react-native` import.
//   - Inside `react-native-css` sources → `react-native-web` (so the wrappers
//     can delegate to the real primitives without re-entering this alias).
//   - Everything else (app code, stories, other deps like @rn-primitives) →
//     the bridge file, which exposes named ESM exports for both wrapped
//     visual primitives and pass-through utilities.
type ResolvePluginLike = {
  name: string;
  enforce?: "pre" | "post";
  resolveId(source: string, importer: string | undefined): string | null;
};

type RolldownOptionsLike = {
  moduleTypes?: Record<string, string>;
  plugins?: ResolvePluginLike[];
};

type BuildWithRolldown = { rolldownOptions?: RolldownOptionsLike };
type OptimizeDepsWithRolldown = { rolldownOptions?: RolldownOptionsLike };

const reactNativeWebBridge = (): ResolvePluginLike => ({
  name: "hobbydeals:rn-web-bridge",
  enforce: "pre",
  resolveId(source, importer) {
    if (source !== "react-native") return null;
    return importer?.includes("react-native-css")
      ? RN_WEB_PATH
      : RN_BRIDGE_PATH;
  },
});

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-themes",
  ],
  typescript: {
    reactDocgen: "react-docgen",
    check: false,
  },
  viteFinal(config) {
    const bridge = reactNativeWebBridge();
    config.plugins = [...(config.plugins ?? []), bridge, tailwindcss()];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // lucide-react-native@1.8.0 has a broken ESM barrel (re-exports
        // LucideProvider which isn't emitted in dist/esm/context.js),
        // breaking Vite's static analysis. Storybook runs on react-native-web,
        // so alias to lucide-react which ships native DOM SVGs with className.
        "lucide-react-native": "lucide-react",
      },
      extensions: [
        ".web.tsx",
        ".web.ts",
        ".web.js",
        ".tsx",
        ".ts",
        ".js",
        ...(config.resolve?.extensions ?? []),
      ],
    };
    // @rn-primitives ships uncompiled JSX in .mjs — tell Rolldown to handle it
    // in both the main build and Vite's dep optimizer (pre-bundle).
    config.build = {
      ...config.build,
      rolldownOptions: {
        ...(config.build as BuildWithRolldown | undefined)?.rolldownOptions,
        moduleTypes: { ".mjs": "jsx" },
      },
    };
    // The dep optimizer runs its own Rolldown pipeline and doesn't execute
    // Vite plugins registered on `config.plugins`. Register the bridge and
    // .mjs loader here too so deps like @rn-primitives/portal (which imports
    // from `react-native` transitively) resolve correctly during pre-bundling.
    const existingOptimizeDeps =
      (config.optimizeDeps as OptimizeDepsWithRolldown | undefined) ?? {};
    const existingRolldown = existingOptimizeDeps.rolldownOptions ?? {};
    config.optimizeDeps = {
      ...existingOptimizeDeps,
      rolldownOptions: {
        ...existingRolldown,
        plugins: [bridge, ...(existingRolldown.plugins ?? [])],
        moduleTypes: {
          ...(existingRolldown.moduleTypes ?? {}),
          ".mjs": "jsx",
        },
      },
    };
    return config;
  },
};

export default config;
