describe("Navigation", () => {
  it("should navigate to the game page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find the link with the specific class attributes and click it
    cy.get('a[href*="game"]').click();

    // The new url should include "/game"
    cy.url({ timeout: 10000 }).should("include", "/game"); // Increased timeout to 10000ms

    // The new page should contain an h1 with "Game"
    cy.get("h1").contains("Game");
  });
});
