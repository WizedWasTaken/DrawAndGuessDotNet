import type { Config } from "jest";
import nextJest from "next/jest";

// Create Jest config using nextJest
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add the Jest config with moduleNameMapper for aliasing
const config: Config = {
  coverageProvider: "v8",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",

  // Configure the path alias for Jest
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Adjust this if your folder structure is different
  },
};

// Create Jest config with Next.js
export default createJestConfig(config);
