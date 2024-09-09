describe('SidebarToggleButton Component', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('input#password').type('securepassword123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home');
  });

  context("desktop resolution", () => {
    beforeEach(() => {
      cy.viewport(1025, 900);
    });

    it('should render correctly with the sidebar visible', () => {
      cy.get('#sidebar-toggle').should('exist');
      cy.get('#sidebar-toggle img').should('have.attr', 'src', '/Icons/Sidebar-1.png');
    });

    it('should render correctly with the sidebar hidden', () => {
      cy.get('button#sidebar-toggle').click();
      cy.wait(500); 
      cy.get('#sidebar-toggle img').should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg');
    });

    it('should change image when sidebar is hidden', () => {
      cy.get('#sidebar-toggle img').should('have.attr', 'src', '/Icons/Sidebar-1.png');

      // Click the button to hide the sidebar
      cy.get('#sidebar-toggle').click();
      cy.wait(500);
      cy.get('#sidebar-toggle img').should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg');

    });

    it('should change image on hover', () => {
      cy.get('#sidebar-toggle img')
        .should('have.attr', 'src', '/Icons/Sidebar-1.png')
        .trigger('mouseover')
        .wait(500) // Wait for 500 milliseconds
        .should('have.attr', 'src', '/Icons/Sidebar-2.png')
    });

    it('should not change image on hover when sidebar is hidden', () => {
      cy.get('#sidebar-toggle').click();
      cy.wait(500); // Wait for 500 milliseconds

      cy.get('#sidebar-toggle img')
        .should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg')
        .trigger('mouseover')
        .wait(500) // Wait for 500 milliseconds
        .should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg')
        .trigger('mouseleave')
        .wait(500) // Wait for 500 milliseconds
        .should('have.attr', 'src', '/Icons/chevron_right_black_24dp.svg');
    });
  });
});
