import { withThemeByClassName } from "@storybook/addon-themes";

import type { Preview, ReactRenderer } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    viewport: {
      viewports: {
        mobile: { name: "Mobile", styles: { width: "390px", height: "844px" } },
        tablet: { name: "Tablet", styles: { width: "768px", height: "1024px" } },
        desktop: { name: "Desktop", styles: { width: "1280px", height: "800px" } },
        wide: { name: "Wide", styles: { width: "1536px", height: "864px" } },
      },
    },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
