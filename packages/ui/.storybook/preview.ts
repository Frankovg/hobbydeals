import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f4f0" },
        { name: "dark", value: "#0a0a0b" },
        { name: "white", value: "#ffffff" },
      ],
    },
  },
};

export default preview;
