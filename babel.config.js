const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: [path.resolve('./')],
          alias: {
            '@components': './components',
            '@navigation': './navigation',
            '@screens': './screens',
          },
        },
      ],
    ],
  };
};
