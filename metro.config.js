/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  resolver: {
    assetExts: ['db', 'mp3', 'ttf', 'obj', 'png', 'jpg', 'fbx', 'glb', 'gif', 'mp4'],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  assets: ['./assets/fonts'],
};
