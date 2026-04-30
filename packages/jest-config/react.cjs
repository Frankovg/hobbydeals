const base = require("./base.cjs");

/** @type {import('jest').Config} */
module.exports = {
  ...base,
  testEnvironment: require.resolve("jest-environment-jsdom"),
  setupFilesAfterEach: [require.resolve("@testing-library/jest-dom")],
};
