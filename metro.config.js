// eslint-disable-next-line import/no-extraneous-dependencies
const {getDefaultConfig} = require("@expo/metro-config");

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  const { resolver: { sourceExts, assetExts } } = defaultConfig;

  return {
    ...defaultConfig,
    transformer: {
      ...defaultConfig.transformer,
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    resolver: {
      ...defaultConfig.resolver,
      assetExts: assetExts.filter(ext => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
