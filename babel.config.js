module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // See https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/
      "react-native-reanimated/plugin",
    ],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
  };
};
