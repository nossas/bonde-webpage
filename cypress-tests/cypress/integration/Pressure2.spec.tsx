describe('Make Pressure with select field', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, (i) => {
    it('Fill pressure form', () => {
      cy.get('[class="Select__control css-yk16xz-control"]').eq(0)
        .type('r{enter}')
      cy.get('[name ="email"]').eq(1)
        .should('be.visible').type('email@exemplo.com');
      cy.get('[name="name"]').eq(1)
        .should('be.visible').type('Nome');
      cy.get('[name ="lastname"]').eq(1)
        .should('be.visible').type('Sobrenome');
      cy.get('[name ="state"]').eq(1)
        .should('be.visible').select('BA');
      cy.get('[name ="city"]').eq(1)
        .should('be.visible').type('Cidade');

      //send email button    
      cy.get('.sc-fzqBZW').eq(1)
        .should('be.visible')
        .click();

      //confirmation
      cy.get('.css-aomufq > img')
        .should('be.visible');
    });
  });
});
