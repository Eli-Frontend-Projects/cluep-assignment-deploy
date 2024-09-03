describe("Sidebar Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it("should display all required sidebar items", () => {
      // Verify that each SidebarItem is rendered with the correct label
      cy.get("#sidebar-profile").should("exist").and("contain.text", "Profile");
      cy.get("#sidebar-chats").should("exist").and("contain.text", "Chats");
      cy.get("#sidebar-sent").should("exist").and("contain.text", "Sent");
      cy.get("#sidebar-draft").should("exist").and("contain.text", "Draft");
      cy.get("#sidebar-spam").should("exist").and("contain.text", "Spam");
      cy.get("#sidebar-trash").should("exist").and("contain.text", "Trash");
      cy.get("#sidebar-connect-apps").should("exist").and("contain.text", "Connect apps");

      // Verify additional items at the bottom of the sidebar
      cy.get("#sidebar-help").should("exist").and("contain.text", "Help");
      cy.get("#sidebar-rate").should("exist").and("contain.text", "Rate");
      cy.get("#sidebar-about").should("exist").and("contain.text", "About");
    });
  });
});