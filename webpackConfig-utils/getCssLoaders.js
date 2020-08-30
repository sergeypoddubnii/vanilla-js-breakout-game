const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//get array of css loaders
const getCssLoaders = (preprocessor) => {
  const cssLoaders = [
    { loader: MiniCssExtractPlugin.loader },
    "css-loader",
    "postcss-loader",
  ];
  if (preprocessor) {
    cssLoaders.push(preprocessor);
  }
  return cssLoaders;
};

module.exports = getCssLoaders;
