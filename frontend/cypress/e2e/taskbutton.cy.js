describe('TaskPanel Component', () => {
    beforeEach(() => {
        cy.visit('/'); 
        cy.get('input#email').type('johndoe@example.com');
        cy.get('input#password').type('securepassword123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/home'); 
    });

    context('TaskButton Tests', () => {
        it('should render the TaskButton components', () => {
            cy.get('.task-button').should('have.length', 4);
        });

        it('should have the correct default styles', () => {
            cy.get('.task-button')
                .first() 
                .should('have.class', 'text-gray-500')
                .and('have.class', 'border-gray-300')
                .and('have.class', 'bg-transparent')
                .and('have.class', 'rounded-2xl')
                .and('have.class', 'border')
                .and('have.class', 'w-[149px]')
                .and('have.class', 'h-[40px]');
        });

        it('should apply hover styles correctly', () => {
            cy.get('.task-button').first().trigger('mouseover');

            cy.get('.task-button').first()
                .should('have.class', 'hover:-translate-y-1')
                .and('have.class', 'hover:text-black')
                .and('have.class', 'hover:border-black');
        });

        it('should have the correct TaskButton text', () => {
            cy.get('.task-button').each(($taskButton) => {
                cy.wrap($taskButton).should('contain.text', 'Task');
            });
        });
    });
});
