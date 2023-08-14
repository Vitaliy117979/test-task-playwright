import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
  },
  projects: [
    // Setup project
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"],  storageState: "playwright/.auth", channel: "chrome" }, // or 'chrome-beta'
      dependencies: ["setup"],
    },
    {
        name: 'Microsoft Edge',
        use: { ...devices['Desktop Edge'], channel: 'msedge' }, // or 'msedge-dev'
      dependencies: ["setup"],

      },

  ],
});
