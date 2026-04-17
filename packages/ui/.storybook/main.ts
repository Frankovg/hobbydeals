import tailwindcss from "@tailwindcss/vite";

import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@chromatic-com/storybook"
  ],
  typescript: {
    reactDocgen: "react-docgen",
    check: false,
  },
  viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    return config;
  },
};

export default config;
