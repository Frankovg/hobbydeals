import { config } from "@hobbydeals/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["metro.config.js", "babel.config.js"],
  },
  ...config,
];
