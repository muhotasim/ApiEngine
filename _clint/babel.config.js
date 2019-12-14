module.exports = function (api) {
  // api.cache(true);

  const presets = [
      '@babel/env', 
      '@babel/react'
  ];

  const plugins = [
      ...(api.env('production') ? [] : ['react-hot-loader/babel']),
      [
          '@babel/plugin-proposal-class-properties',
          {
              'loose': true
          }
      ]
  ];

  return {
      presets,
      plugins
  };
}