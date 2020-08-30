const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    open: true,
    historyApiFallback: true,
    clientLogLevel: "warning",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
};
