import { test as setup, chromium } from "@playwright/test";

setup("authenticate", async () => {
  const browser = await chromium.launch({
    headless: false,
    args: [
      "--disable-dev-shm-usage",
      "--disable-blink-features=AutomationControlled",
    ],
  });

  const context = await browser.newContext();
  const page = await context.newPage();
  const navigationPromise = page.waitForNavigation({
    waitUntil: "domcontentloaded",
  });

  await page.setDefaultNavigationTimeout(0);
  await page.goto("https://mail.google.com/");

  await navigationPromise;

  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', "So.Yummy.BestRecipes@gmail.com");
  await page.click("#identifierNext");

  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', "BestRecipes");

  await page.waitForSelector("#passwordNext", { visible: true });
  await page.click("#passwordNext");
  await page.waitForNavigation();

  const targetElement = await page.$("div.bsU");

  if (targetElement) {
    const elementText = await targetElement.innerText();
    const processedText = elementText.replace(/\s+/g, " ").trim();
    console.log(`Unread mail: ${processedText}`);
  }

  await browser.close();
});