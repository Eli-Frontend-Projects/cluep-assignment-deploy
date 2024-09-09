describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('should display the login form', () => {
    cy.get('input#email').should('be.visible');
    cy.get('input#password').should('be.visible');
    cy.get('#login-button').should('be.visible');
  });

  it('should successfully log in with valid credentials', () => {
    cy.get('input#email').type('johndoe@example.com');
    cy.get('input#password').type('securepassword123');
    cy.get('#login-button').click();
    cy.wait(500); 

    cy.url().should('include', '/home'); 
  });

  it('should display an error message on failed login', () => {
    cy.get('input#email').type('wrongemail@example.com');
    cy.get('input#password').type('wrongpassword');
    cy.get('#login-button').click();

    cy.get('p.text-red-600').should('contain.text', 'Failed to login. Please check your email and password and try again.');
  });
});