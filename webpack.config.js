const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssPluginExtractPlugin = require('mini-css-extract-plugin');


function devtool() {
  return 'source-map';
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './index.js',
    'lazy-load': './js/lazy-load.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve( __dirname, 'public')
  },

  devtool: devtool(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve( __dirname, 'src', 'favicon.ico'),
        to: path.resolve( __dirname, 'public')
      },
      {
        from: path.resolve( __dirname, 'src', 'images'),
        to: path.resolve( __dirname, 'public', 'images')
      },
      {
        from: path.resolve( __dirname, 'src', 'pages', '*.html'),
        to: path.resolve( __dirname, 'public')
      }
    ]),
    new MiniCssPluginExtractPlugin({
      filename: '[name].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssPluginExtractPlugin.loader,
        },
          'css-loader',
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      }
    ]
  }
};