module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return {
    devtool: "source-map",
    devServer: {
      port: 3000,
      hot: true,
    },
  };
};
