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

// withNativeWind MUST be the outermost wrapper
module.exports = withNativeWind(config, {
  input: "./global.css",
});
