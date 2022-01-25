import { Browser, chromium, Page, BrowserContext } from "@playwright/test";

async function globalSetup() {
  const browser: Browser = await chromium.launch();

  const browserContext: BrowserContext = await browser.newContext({
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  });

  const page: Page = await browserContext.newPage();

  await page.goto(`https://google.com/`, { timeout: 0 });
}

export default globalSetup;
