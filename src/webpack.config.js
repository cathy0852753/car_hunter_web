const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    historyApiFallback: true,
    setupMiddlewares: (middlewares, devServer) => {
      // 在此处添加自定义中间件
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // 添加自定义中间件
      // devServer.app.use((req, res, next) => {
      //   // your custom middleware logic
      //   next();
      // });

      return middlewares;
    },
  },
};
