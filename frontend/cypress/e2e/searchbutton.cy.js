describe('Search Area Component', () => {
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('input#email').type('johndoe@example.com');
        cy.get('input#password').type('securepassword123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/home'); 
    });
  
    it('should display the SearchButton when search is not visible', () => {
      // Check if the SearchButton is visible initially
      cy.get('#search-button').should('exist');
      cy.get('img[src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"]').should('be.visible');
    });
  
    it('should toggle visibility of SearchButton when clicked', () => {
      cy.get('#search-button').click();
      cy.get("#search-button").should('not.exist');  
    });
  });