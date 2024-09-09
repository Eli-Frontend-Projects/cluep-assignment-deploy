describe('MessageInput Component', () => {
  const maxHeight = 120; 

  beforeEach(() => {
    cy.visit('/');
    cy.get('input#email').type('johndoe@example.com');
    cy.get('input#password').type('securepassword123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home'); 
  });

  it('should expand the textarea as text is input', () => {
    const moderateText = 'This is a moderate-length message that should cause the textarea to expand. '.repeat(3);

    cy.get('#messageInput')
      .type(moderateText)
      .should('have.css', 'height')
      .then((height) => {
        const heightValue = parseInt(height); 
        expect(heightValue).to.be.greaterThan(40); 
      });
  });

  it('should not exceed max height with very long input', () => {
    const veryLongText = 'This is a very long message that should definitely cause the textarea to expand and reach its maximum height. '.repeat(10);

    cy.get('#messageInput')
      .type(veryLongText)
      .should('have.css', 'height')
      .then((height) => {
        const heightValue = parseInt(height); 
        expect(heightValue).to.be.lte(maxHeight); 
      });
  });
});
