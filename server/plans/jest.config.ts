module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/tests/**/*.ts", "**/?(*.)+(spec|test).ts"],
};
