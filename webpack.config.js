const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },
  //source maps enabled
  devtool: "source-map",

  //server configuration
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },

  //loaders
  module: {
    rules: [
        //scss loader
      {
        //check if any scss files are present and use below loaders if there is a match
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      //babel loader - used for backward compatability for older js to support in all browsers
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            }
        }
      }
    ],
  },

  //plugins
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack Starter",
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
