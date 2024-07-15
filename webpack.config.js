const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: "umd",
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  // devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
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
  },
};
