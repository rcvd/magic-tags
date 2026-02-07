const path = require('path');

module.exports = {
  entry: './src/extension.ts',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    '@blueprintjs/core': ['Blueprint', 'Core'],
  },
  externalsType: 'window',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'extension.js',
    path: path.resolve(__dirname),
    library: {
      type: 'module',
    },
    clean: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [],
  devtool: 'source-map',
  mode: 'production',
};
