describe('Make Pressure', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  Cypress._.times(1, (i) => {
    it('Fill pressure form', () => {
      cy.get('[name ="email"]').eq(0).
        should('be.visible').type('email@exemplo.com');
      cy.get('[name="name"]').eq(0)
        .should('be.visible').type('Nome');
      cy.get('[name ="lastname"]').eq(0)
        .should('be.visible').type('Sobrenome');
      cy.get('[name ="city"]').eq(0)
        .should('be.visible').type('Cidade');
      cy.get('[name ="state"]').eq(0)
        .should('be.visible').select('MG');

      //send email button    
      cy.get('.sc-fzqBZW').eq(0)
        .should('be.visible')
        .click();

      //confirmation
      cy.get('.css-aomufq > img')
        .should('be.visible');
    });
  });

  it('incomplete fill form without name', () => {
    cy.get('[name ="email"]').eq(0).should('be.visible')
      .type('email@exemplo.com');
    cy.get('[name ="lastname"]').eq(0)
      .should('be.visible').type('Sobrenome');
    cy.get('[name ="city"]').eq(0)
      .should('be.visible').type('Cidade');
    cy.get('[name ="state"]').eq(0)
      .should('be.visible').select('MG');
    cy.get('.sc-fzqBZW').eq(0)
      .should('be.visible')
      .click();

    //required field 
    cy.get('[class="sc-fzqBkg duaeRa"]').eq(0)
      .should('be.visible');
  });
});
