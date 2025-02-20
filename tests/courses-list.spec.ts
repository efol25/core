import { test, expect } from "@playwright/test";

test("create and delete course", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("textbox", { name: "Название" }).click();
  await page.getByRole("textbox", { name: "Название" }).fill("test course");
  await page.getByRole("textbox", { name: "Описание" }).click();
  await page
    .getByRole("textbox", { name: "Описание" })
    .fill("test description");
  await page.getByRole("button", { name: "Добавить" }).click();
  await expect(page.getByText("test coursetest description")).toBeVisible();
  await page.getByRole("button", { name: "Удалить" }).click();

  await expect(page.getByText("test coursetest description")).not.toBeVisible();
});
