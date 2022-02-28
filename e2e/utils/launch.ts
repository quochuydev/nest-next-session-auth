import { Page } from "@playwright/test";

async function createPage(
  page: Page,
  options?: {
    useStorageState?: { userId: string } | { adminId: string };
    browserContextOptions?: {
      permissions?: string[];
      acceptDownloads?: boolean;
    };
  }
) {
  const { useStorageState, browserContextOptions = {} } = options || {};
  let storageState: string;

  const browserContext = await page
    .context()
    .browser()
    .newContext({ storageState, ...browserContextOptions });
  return browserContext.newPage();
}

async function closePage(page: Page) {
  return page?.context().close();
}

export default {
  createPage,
  closePage,
};
