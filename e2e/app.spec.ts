import { expect, test } from "@playwright/test";

test("should navigate to the home page", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // The new page should contain an img with alt "PokeSearch"
  await expect(page.locator("img[alt='PokeSearch']")).toBeVisible();
});

test("should load a list of pokemons", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Check if the loading indicator is visible
  await expect(page.locator("img[alt='Pokeball loading']")).toBeVisible();

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Check if the grid contains exactly 12 pokemons
  const links = grid.locator("a");
  await expect(links).toHaveCount(12);
});

test("should load more pokemons on scroll", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Scroll to the bottom of the page
  await page.mouse.wheel(0, 10000);

  // Check if the grid contains exactly 24 pokemons
  const links = grid.locator("a");
  await expect(links).toHaveCount(24);
});

test("should display not found state when pokemon name is not found", async ({
  page,
}) => {
  // Start from the home page
  await page.goto("/");

  // Type a pokemon name that does not exist
  await page.locator("input").fill("not-found");

  // Check if the not found state is visible
  await expect(page.locator("p")).toHaveText(
    "Pokémon name not found, check your spelling."
  );
});

test("should display error state when an error occurs", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Type in the search bar
  await page.locator("input").fill("error");

  // Force an error on the API request by intercepting the request and returning an error response
  await page.route("https://pokeapi.co/api/v2/pokemon/error", (route) =>
    route.fulfill({
      status: 500, // Simulate an internal server error
      contentType: "application/json",
      body: JSON.stringify({ message: "An error occurred" }),
    })
  );

  // Check if the error state is visible
  await expect(page.locator("p")).toHaveText(
    "An error occurred while fetching the data. Please try again later."
  );
});

test("should search for a pokemon and display the result", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Type in the search bar
  await page.locator("input").fill("pikachu");

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Check if the grid contains exactly 1 pokemon
  const links = grid.locator("a");
  await expect(links).toHaveCount(1);
});

test("should add a pokemon to favorites from the home page", async ({
  page,
}) => {
  // Start from the home page
  await page.goto("/");

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Find the first pokemon
  const pokemon = grid.locator("a").first();
  const name = await pokemon.locator("h2").innerText();

  // Click on favorite button
  await pokemon.locator("button").click();

  // Check if the pokemon is added to favorites
  const toaster = page.locator("ol[class~='toaster']");
  const text = `${name} added to favorites`;
  await expect(toaster.getByText(text)).toBeVisible();
});

test("should remove a pokemon from favorites from the home page", async ({
  page,
}) => {
  // Start from the home page
  await page.goto("/");

  // Set the local storage
  const mockStorage = {
    state: {
      favorites: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    },
    version: 0,
  };
  await page.evaluate((data) => {
    localStorage.setItem("favorites-storage", JSON.stringify(data));
  }, mockStorage);

  // Reload the page to reflect changes in local storage
  await page.reload();

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Find the first pokemon
  const pokemon = grid.locator("a").first();
  const name = await pokemon.locator("h2").innerText();

  // Click on favorite button
  await pokemon.locator("button").click();

  // Check if the pokemon is remove from favorites
  const toaster = page.locator("ol[class~='toaster']");
  const text = `${name} removed from favorites`;
  await expect(toaster.getByText(text)).toBeVisible();
});

test("should navigate to the favorites page without favorites", async ({
  page,
}) => {
  // Start from the home page
  await page.goto("/");

  // Reload the page to reflect changes in local storage
  await page.reload();

  // Navigate to the favorites page
  await page.locator("a[href='/favorites']").click();

  // Check for the empty state
  await expect(page.locator("p")).toHaveText("No favorites yet, add some!");
});

test("should navigate to the favorites page with favorites", async ({
  page,
}) => {
  // Start from the home page
  await page.goto("/");

  // Set the local storage
  const mockStorage = {
    state: {
      favorites: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    },
    version: 0,
  };
  await page.evaluate((data) => {
    localStorage.setItem("favorites-storage", JSON.stringify(data));
  }, mockStorage);

  // Reload the page to reflect changes in local storage
  await page.reload();

  // Navigate to the favorites page
  await page.locator("a[href='/favorites']").click();

  // Check if the page title is "Favorites"
  await expect(page.locator("h1")).toHaveText("Favorites");

  // Check if the list of pokemons is visible and has the correct number of pokemons
  const grid2 = page.locator("div[class~='grid']").first();
  await expect(grid2).toBeVisible();
  await expect(grid2).toHaveCount(1);
});

test("should navigate to pokemon page that do not exists", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Navigate to non existing pokemon page
  await page.goto("/pokemon/not-found");

  // Wait for API request to be made
  await page.route("https://pokeapi.co/api/v2/pokemon/not-found", (route) =>
    route.fulfill({
      status: 404, // Simulate a 404 error
      contentType: "application/json",
      body: JSON.stringify({ message: "Pokemon not found" }),
    })
  );

  // Check if the not found state is visible
  await expect(page.locator("h2")).toHaveText("Not Found");
});

test("should navigate to pokemon page", async ({ page }) => {
  // Start from the home page
  await page.goto("/");

  // Wait for the list to be visible
  const grid = page.locator("div[class~='grid']").first();
  await expect(grid).toBeVisible();

  // Find the first pokemon
  await grid.locator("a").first().click();

  // Check if the page title is "Bulbasaur"
  await expect(page.locator("h1")).toHaveText("bulbasaur");

  // Check if the image is visible
  await expect(page.locator("img[alt='bulbasaur']")).toBeVisible();
});

test("should add a pokemon to favorites from the pokemon page", async ({
  page,
}) => {
  // Start from the pokemon page
  await page.goto("/pokemon/bulbasaur");

  // Find the favorite button
  const favoriteButton = page.locator("button").first();

  // Click on favorite button
  await favoriteButton.click();

  // Check if the pokemon is added to favorites
  const toaster = page.locator("ol[class~='toaster']");
  const text = "Bulbasaur added to favorites";
  await expect(toaster.getByText(text)).toBeVisible();
});

test("should remove a pokemon from favorites from the pokemon page", async ({
  page,
}) => {
  // Start from the pokemon page
  await page.goto("/pokemon/bulbasaur");

  // Set the local storage
  const mockStorage = {
    state: {
      favorites: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    },
    version: 0,
  };
  await page.evaluate((data) => {
    localStorage.setItem("favorites-storage", JSON.stringify(data));
  }, mockStorage);

  // Reload the page to reflect changes in local storage
  await page.reload();

  // Find the favorite button
  const favoriteButton = page.locator("button").first();

  // Click on favorite button
  await favoriteButton.click();

  // Check if the pokemon is added to favorites
  const toaster = page.locator("ol[class~='toaster']");
  const text = "Bulbasaur removed from favorites";
  await expect(toaster.getByText(text)).toBeVisible();
});
