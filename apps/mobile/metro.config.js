const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Map package names to TypeScript source directories
config.resolver.extraNodeModules = {
  '@diagno/api-client': path.resolve(monorepoRoot, 'packages/api-client/src'),
  '@diagno/schemas': path.resolve(monorepoRoot, 'packages/schemas/src'),
};

module.exports = config;
