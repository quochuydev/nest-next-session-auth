import { Browser, chromium, Page, BrowserContext } from "@playwright/test";
import routeUtils from "./utils/route";

async function globalSetup() {
  const browser: Browser = await chromium.launch();

  const browserContext: BrowserContext = await browser.newContext({
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  });

  const page: Page = await browserContext.newPage();
  // await page.goto(`${routeUtils.webUrl}`, { timeout: 0 });
}

export default globalSetup;
