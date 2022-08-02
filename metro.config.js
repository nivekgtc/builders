// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config")

// module.exports = getDefaultConfig(__dirname)


module.exports = (async () => {

  const {
    resolver: {
      sourceExts,
      assetExts
    }
  } = await getDefaultConfig(__dirname)

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer')
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg']
    }
  }
})

// For one idea on how to support symlinks in Expo, see:
// https://github.com/infinitered/ignite/issues/1904#issuecomment-1054535068
