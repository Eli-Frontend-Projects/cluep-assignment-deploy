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

    it("should collapse and expand the sidebar when toggled", () => {
        // Click the toggle button to collapse the sidebar
        cy.get("#sidebar-toggle").click();
  
        // Wait for the transition to finish (adjust time if needed)
        cy.wait(500); // Adjust wait time as necessary
  
        // Verify that the sidebar has collapsed
        cy.get('div[class*="w-0"]').should('exist'); // Check if width is 0
        cy.get('#sidebar-toggle img')
          .should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg'); // Check if the button image has changed
  
        // Click the toggle button again to expand the sidebar
        cy.get("#sidebar-toggle").click();
  
        // Wait for the transition to finish (adjust time if needed)
        cy.wait(500); // Adjust wait time as necessary
  
        // Verify that the sidebar has expanded
        cy.get('div[class*="w-[200px]"]').should('exist'); // Check if width is 200px
        cy.get('#sidebar-profile').should('be.visible'); 
        cy.get('#sidebar-toggle img')
          .should('have.attr', 'src', '/Icons/Sidebar-1.png'); // Check if the button image has reverted
      });
  });
});