const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = (env = {}) => {
  const { mode = "production", presets = [] } = env;

  console.log("presets:", presets);
  console.log("mode:", mode);
  return merge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.(ts|js)x?$/i,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  "@babel/preset-react",
                  "@babel/preset-typescript",
                ],
              },
            },
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: `${mode === "development" ? "Development Mode" : ""}`,
          template: "./public/index.html",
        }),
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
          async: false,
        }),
        new ESLintPlugin({
          extensions: ["js", "jsx", "ts", "tsx"],
        }),
      ],
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};
