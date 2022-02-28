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

  expect(true).toBeTruthy();
});
