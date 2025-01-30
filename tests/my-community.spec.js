import { test, expect } from "@playwright/test";
import exp from "constants";

// Important: Since we are not resetting the database state,
// therefore, please make sure to erase every change in db.json from Git source control,
// and please manually restart json-server before every test,

test.describe("when not logged in", () => {
  test("should redirect to login page if not logged in", async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.waitForURL("http://localhost:5173/login");
    await expect(page.getByRole("button", { name: "LOGIN" })).toBeVisible();
  });
});

test.describe("when logged in", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Ensure redirection to login page
    await expect(page).toHaveURL("http://localhost:5173/login");
    await expect(page.getByRole("button", { name: "LOGIN" })).toBeVisible();

    // Fill in login credentials and submit
    await page.getByTestId("username").locator("input").fill("martha");
    await page.getByTestId("password").locator("input").fill("111");

    await page.getByRole("button", { name: "LOGIN" }).click();

    // Wait for redirection after login
    await page.waitForURL("http://localhost:5173/");
    await expect(page.getByRole("button", { name: "LOGOUT" })).toBeVisible();
  });

  test("should be able to submit a post", async ({ page }) => {
    await expect(page.getByTestId("textfield-post")).toBeVisible();
    await page
      .getByTestId("textfield-post")
      .locator("textarea:not([readonly])") // Select the editable textarea
      .fill("I love dogs!");

    await page.getByRole("button", { name: "SUBMIT POST" }).click();

    // Wait for the first post to be visible
    await expect(
      page.locator('p:has-text("I love dogs!")').nth(0)
    ).toBeVisible();
  });

  test("should be able to comment on a post", async ({ page }) => {
    // Locate the first post containing the text "I love dogs!"
    const post = page.locator('div.post:has-text("I love dogs!")').first();
    await expect(post).toBeVisible();

    // Locate the form inside the first post
    const form = post.locator("form");
    await expect(form).toBeVisible(); // Ensure the form is visible

    // Locate the textarea (not readonly) inside the form
    const textarea = form.locator("textarea:not([readonly])");
    await expect(textarea).toBeVisible(); // Ensure the textarea is visible

    // Fill the textarea with a comment
    await textarea.fill("I love dogs too");

    // Locate the submit button and click it
    const submitButton = form.locator('button[type="submit"]');
    await submitButton.click();
  });

  test("should see comment", async ({ page }) => {
    const post = page.locator('div.post:has-text("I love dogs!")').first();
    const showCommentsBtn = post
      .locator('button:has-text("COMMENT"), button:has-text("COMMENTS")')
      .first();
    await expect(showCommentsBtn).toBeVisible();
    showCommentsBtn.click();
    const newComment = post
      .locator('.comment-container p:has-text("I love dogs too")')
      .first();
    await expect(newComment).toBeVisible();
  });

  test("should reply to a comment", async ({ page }) => {
    // Locate the first post containing the text "I love dogs!"
    const post = page.locator('div.post:has-text("I love dogs!")').first();

    // Ensure the post is visible
    await expect(post).toBeVisible();

    // Locate the button to show comments and click it
    const showCommentsBtn = post
      .locator('button:has-text("COMMENT"), button:has-text("COMMENTS")')
      .first();
    await expect(showCommentsBtn).toBeVisible();
    await showCommentsBtn.click();

    // Wait for the comment section to appear and be visible
    const commentSection = post.locator(".comment-container");
    await expect(commentSection).toBeVisible(); // Ensure comment container is visible

    // Locate the box containing the comment we want to reply to
    const commentBox = commentSection
      .locator('.box p:has-text("I love dogs too")')
      .first();

    // Ensure the comment box is visible
    await expect(commentBox).toBeVisible();

    // Try to locate the form for replying to the comment, which should be in the parent box element
    const replyForm = commentBox.locator("..").locator("form");
    await expect(replyForm).toBeVisible();

    // Locate the textarea inside the form, ensuring it's not readonly
    const textarea = replyForm.locator("textarea:not([readonly])");
    await expect(textarea).toBeVisible(); // Ensure textarea is visible

    // Fill in the reply
    await textarea.fill("me too...");

    // Locate the submit button and click it
    const submitButton = replyForm.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await submitButton.click();
  });

  test("should log out", async ({ page }) => {
    const logoutButton = page.locator("button#logout");
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();
    await page.waitForURL("http://localhost:5173/login");
  });
});

test.describe("when signing up", () => {
  test("dupllicate accounts can not be created", async ({ page }) => {
    await page.goto("http://localhost:5173/signup");
    const signUpBtn = page.locator('button:has-text("SIGN UP")');
    await expect(signUpBtn).toBeVisible();

    await page.getByTestId("username").locator("input").fill("martha");
    await page.getByTestId("password").locator("input").fill("111");
    await signUpBtn.click();

    await expect(
      page.getByText("Username already exists. Please choose a different one.")
    ).toBeVisible();
  });

  test("user can create a new account", async ({ page }) => {
    await page.goto("http://localhost:5173/signup");

    const signUpBtn = page.locator('button:has-text("SIGN UP")');
    await expect(signUpBtn).toBeVisible();

    await page.getByTestId("username").locator("input").fill("garry");
    await page.getByTestId("password").locator("input").fill("333");

    await signUpBtn.click(); // Increase timeout for URL navigation

    await page.waitForURL("http://localhost:5173/", { timeout: 10000 });
    await expect(page.getByText("Feeds")).toBeVisible();
  });
});
