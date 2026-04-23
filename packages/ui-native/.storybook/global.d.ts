declare module "*.css";

// react-native-web has no bundled type declarations. The Storybook bridge
// uses it for the pass-through utility imports (Platform, StyleSheet, …);
// typed as `any` is fine since the bridge itself re-exports them verbatim.
declare module "react-native-web";
declare module "react-native-web/*";
