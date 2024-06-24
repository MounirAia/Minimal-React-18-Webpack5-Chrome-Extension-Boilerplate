/* eslint-disable no-undef */
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    popup: path.resolve("src/popup/Main.jsx"),
    options: path.resolve("src/options/Main.jsx"),
    background: path.resolve("src/background/background.js"),
    contentScript: path.resolve("src/contentScript/contentScript.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Match both .js and .jsx files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/, // Exclude node_modules directory
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve("public"), to: path.resolve("dist") }],
    }),
    new CleanWebpackPlugin(), // Clean dist folder before adding built files
    new HtmlWebpackPlugin({
      title: "Weather App - Popup",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      title: "Weather App - Options",
      filename: "options.html",
      chunks: ["options"],
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"], // Add .jsx to resolve extensions
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

// If you want to use react in the contentScript replace the optimization key by this:
// optimization: {
//   splitChunks: {
//     chunks(chunk) {
//       return chunk.name !== "contentScript";
//     },
//   },
// },
