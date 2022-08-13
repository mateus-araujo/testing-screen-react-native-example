module.exports = {
  preset: "react-native",
  // setupFiles: ["<rootDir>/jest/setup.js"],
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
