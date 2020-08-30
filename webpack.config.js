const path = require("path");
const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//get different configs
const developmentConfig = require("./webpackConfig-utils/developmentConfig");
const productionConfig = require("./webpackConfig-utils/productionConfig");
const getCssLoaders = require("./webpackConfig-utils/getCssLoaders");

const commonConfig = {
  context: path.resolve(__dirname, "src"),
  entry: ["@babel/polyfill", "./index.js"],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: getCssLoaders("sass-loader"),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        loader: ["file-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: ["file-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
};

module.exports = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  if (isDevelopment) {
    return merge(commonConfig, developmentConfig);
  }

  if (isProduction) {
    return merge(commonConfig, productionConfig);
  }
};
