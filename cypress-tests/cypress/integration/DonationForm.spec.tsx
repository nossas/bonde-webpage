describe('Make Donation', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Fill donation form',async () => {
        cy.get('.css-1aupfcx')
            .should('be.visible');
       cy.get('.btn-submit')
            .should('be.visible')
            .click()
        //TODO - fazer a confirmação do checkout para o PagarMe       
        cy.get('[id="pagarme-checkout-container"]')
            .should('exist');   
    });
});