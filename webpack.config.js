module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: /node_modules/,
        enforce: "pre",
      },
    ],
  },
  ignoreWarnings: [/Failed to parse source map/], // Отключает предупреждение
};
