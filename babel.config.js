module.exports = {
  presets: ["babel-preset-expo", 'module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extension: ['.js', '.ts', '.tsx'],
        alias: {
          '~': './app'
        }
      }
    ],
    // [
    //   'babel-plugin-root-import',
    //   {
    //     rootPathPrefix: '~',
    //     rootPathSuffix: 'app'
    //   }
    // ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
  env: {
    production: {
      plugins: [
        [
          require.resolve('babel-plugin-module-resolver'),
          {
            cwd: 'babelrc',
            extension: ['.js', '.ts', '.tsx', '.story', '.*'],
            alias: {
              '~': './app'
            }
          }
        ],
        // [
        //   'babel-plugin-root-import',
        //   {
        //     rootPathPrefix: '~',
        //     rootPathSuffix: 'app'
        //   }
        // ],
        [
          '@babel/plugin-proposal-decorators',
          {
            legacy: true,
          }
        ],
        ['@babel/plugin-proposal-optional-catch-binding']
      ]
    },
  }
}
