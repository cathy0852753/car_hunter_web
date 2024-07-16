const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const buildOutputPath = path.join(__dirname, 'dist');

module.exports = function (webpackEnv, argv) {
  const isEnvProduction = argv.mode === 'production';

  return {
    entry: {
      main: path.resolve(__dirname, "src/index.js"),
    },
    cache: true,
    mode: argv.mode,
    output: {
      path: buildOutputPath,
      filename: '[name].bundle.js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          }
        },
        {
          test: /\.css$/,
          // exclude: path.resolve(__dirname, 'src/stories'),
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: 'include/worksheetApp',
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isEnvProduction,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'svg-url-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ]
    },
    optimization: {
      minimize: isEnvProduction,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.REACT_APP_BASE_URL': 'window.location.href',
        'process.env.NODE_ENV': JSON.stringify(argv.mode),
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].chunk.css',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      historyApiFallback: true,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        return middlewares;
      },
    }
  };
};