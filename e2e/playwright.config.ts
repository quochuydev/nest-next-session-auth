import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  workers: process.env.CI ? 2 : undefined,
  maxFailures: process.env.CI ? 10 : undefined,
  reporter: [["junit", { outputFile: "./reports/junit.xml" }]],
  retries: 1,
  testDir: "./tests",
  outputDir: "./artifact",
  timeout: 120000,
  testMatch: "**/*.spec.ts",
  globalSetup: require.resolve("./global-setup"),
  use: {
    headless: true,
    browserName: "chromium",
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    navigationTimeout: 0,
    screenshot: "only-on-failure",
    video: "on-first-retry",
    trace: "on-first-retry",
  },
};

export default config;
