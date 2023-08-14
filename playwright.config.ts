import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  use: {
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },

    {
      name: "Google Chrome",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth",
        channel: "chrome",
      },
      dependencies: ["setup"],
    },
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
      dependencies: ["setup"],
    },
  ],
});
