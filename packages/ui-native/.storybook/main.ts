import tailwindcss from "@tailwindcss/vite";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  typescript: {
    reactDocgen: "react-docgen",
    check: false,
  },
  viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "react-native": "react-native-web",
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
    config.build = {
      ...config.build,
      rolldownOptions: {
        ...(config.build as any)?.rolldownOptions,
        moduleTypes: { ".mjs": "jsx" },
      },
    };
    return config;
  },
};

export default config;
