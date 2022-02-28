import { test, expect, Page } from "@playwright/test";
import LaunchUtil from "../utils/launch";
import RouteUtil from "../utils/route";

let webPage: Page;

test.afterEach(async () => {
  await LaunchUtil.closePage(webPage);
});

const account = {
  username: `${Date.now()}`,
  email: `${Date.now()}@gmail.com`,
  password: "password",
  confirmPassword: "password",
};

test(`Register a new account and login`, async ({ page }) => {
  webPage = await LaunchUtil.createPage(page);
  webPage.goto(RouteUtil.webUrl);

  await webPage.click('text="Register"');
  await webPage.fill('[placeholder="email"]', account.email);
  await webPage.fill('[placeholder="username"]', account.username);
  await webPage.fill('[placeholder="password"]', account.password);
  await webPage.fill(
    '[placeholder="confirmPassword"]',
    account.confirmPassword
  );
  await webPage.click('button:has-text("REGISTER")');

  expect(true).toBeTruthy();

  await webPage.click('text="Login"');
  await webPage.fill('[placeholder="username"]', account.username);
  await webPage.fill('[placeholder="password"]', account.password);
  await webPage.click('button:has-text("LOGIN")');

  expect(true).toBeTruthy();
});
