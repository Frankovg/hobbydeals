const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Monorepo: watchFolders so Metro resolves packages/
config.watchFolders = [monorepoRoot];

// Resolver to find node_modules across the monorepo
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// Force shared native packages to resolve from the mobile app's node_modules
// to avoid duplicate module instances in a pnpm monorepo
config.resolver.extraNodeModules = {
  "react-native": path.resolve(projectRoot, "node_modules/react-native"),
  react: path.resolve(projectRoot, "node_modules/react"),
  "react-dom": path.resolve(projectRoot, "node_modules/react-dom"),
};

// withNativeWind MUST be the outermost wrapper
module.exports = withNativeWind(config, {
  input: "./global.css",
});
