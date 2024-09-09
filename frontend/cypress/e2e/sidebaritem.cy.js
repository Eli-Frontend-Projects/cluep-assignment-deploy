describe('SidebarItem Component', () => {
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

    it('should render with correct props for each sidebar item', () => {
      const sidebarItems = [
        { id: 'sidebar-profile', icon: '/Icons/ProfilePic.jpg', label: 'John Doe' },
        { id: 'sidebar-chats', icon: '/Icons/Chats.png', label: 'Chats' },
        { id: 'sidebar-sent', icon: '/Icons/Sent.png', label: 'Sent' },
        { id: 'sidebar-draft', icon: '/Icons/Draft.png', label: 'Draft' },
        { id: 'sidebar-spam', icon: '/Icons/Spam.png', label: 'Spam' },
        { id: 'sidebar-trash', icon: '/Icons/Trash.png', label: 'Trash' },
        { id: 'sidebar-connect-apps', icon: '/Icons/Connect_apps.png', label: 'Connect apps' },
        { id: 'sidebar-help', icon: '/Icons/Help.png', label: 'Help' },
        { id: 'sidebar-rate', icon: '/Icons/Rate.png', label: 'Rate' },
        { id: 'sidebar-about', icon: '/Icons/About.png', label: 'About' }
      ];

      sidebarItems.forEach(({ id, icon, label }) => {
        cy.get(`#${id}`).should('exist');
        cy.get(`#${id} img`).should('have.attr', 'src', icon);
        cy.get(`#${id} span`).should('contain.text', label);
      });
    });

    it('should apply selected styling when each sidebar item is clicked', () => {
      const sidebarItems = [
        'sidebar-profile',
        'sidebar-chats',
        'sidebar-sent',
        'sidebar-draft',
        'sidebar-spam',
        'sidebar-trash',
        'sidebar-connect-apps',
        'sidebar-help',
        'sidebar-rate',
        'sidebar-about'
      ];

      sidebarItems.forEach(id => {
        cy.get(`#${id}`).click();
        cy.get(`#${id}`)
          .should('have.class', 'bg-gray-700')
          .and('have.class', 'text-white');
        
      });
    });

    it('should apply hover styling when hovering over each sidebar item', () => {
      const sidebarItems = [
        'sidebar-profile',
        'sidebar-chats',
        'sidebar-sent',
        'sidebar-draft',
        'sidebar-spam',
        'sidebar-trash',
        'sidebar-connect-apps',
        'sidebar-help',
        'sidebar-rate',
        'sidebar-about'
      ];

      sidebarItems.forEach(id => {
        cy.get(`#${id}`).trigger('mouseover');
        cy.get(`#${id}`)
          .should('have.class', 'hover:bg-gray-700')
          .and('have.class', 'text-white');
      });
    });

  });
});
