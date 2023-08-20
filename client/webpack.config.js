const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // add html webpack plugin
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Html Webpack Plugin', 
      }),
      // add manifest plugin
      new WebpackPwaManifest({
        name: 'Just Another Text Editor PWA',
        short_name: 'JATE',
        description: 'A simple offline text editor PWA',
        background_color: "#225ca3",
        theme_color: "#225ca3",
        starturl: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons')
          }
        ]
      }),
      // add workbox plugin
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        }, // add css and style loader
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            } // add babel loader
          }
        },
      ],
    },
  };
};
