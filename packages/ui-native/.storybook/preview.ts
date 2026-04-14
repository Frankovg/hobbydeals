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
    viewport: {
      viewports: {
        iphoneSE: { name: "iPhone SE", styles: { width: "375px", height: "667px" } },
        iphone14: { name: "iPhone 14", styles: { width: "390px", height: "844px" } },
        iphone14ProMax: { name: "iPhone 14 Pro Max", styles: { width: "430px", height: "932px" } },
        android: { name: "Android", styles: { width: "360px", height: "800px" } },
      },
    },
  },
};

export default preview;
