const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      webpackConfig.watchOptions = {
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/build/**',
          '**/dist/**',
          '**/public/**'
        ]
      };
      return webpackConfig;
    }
  }
};