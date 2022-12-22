const path = require('path');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
module.exports = function webpackConfig(env, args) {
  const mode = args.mode ?? 'development';

  return {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          // See .babelrc for further babel config
        },
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },
    optimization: {
      // eslint-disable-next-line global-require
      minimizer: [new (require('terser-webpack-plugin'))({ extractComments: false })],
    },
    devServer: {
      hot: true,
      open: true,
      historyApiFallback: true,
      static: { directory: path.join(__dirname, 'public') },
      port: 5678,
    },
    plugins: [
      new Dotenv({
        path: mode === 'development' ? `./.env.${mode}.local` : './.env',
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: 'public', to: '.', force: true }],
      }),
    ],
  };
};
