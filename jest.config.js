module.exports = {
  preset: "react-native",
  setupFiles: [
    "<rootDir>/jest/setup.ts",
    "./node_modules/react-native-gesture-handler/jestSetup.js"
  ],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  }, // this was important
  moduleNameMapper: {
    ".+\\.(png)$": "jest-transform-stub",
    "\\.(svg)$": "<rootDir>/jest/svgMock.js",
  },
  transformIgnorePatterns: [], // so was this
};
