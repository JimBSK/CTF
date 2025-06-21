const path = require('path');
const { addAfterLoader } = require('@craco/craco');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Добавляем обработчик файлов
      const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      };
      
      return addAfterLoader(webpackConfig, 'url-loader', fileLoader);
    },
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
    }
  }
};