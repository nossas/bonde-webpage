describe('Make Donation', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('Fill donation form', () => {
        cy.get('.css-1aupfcx')
            .should('be.visible');
        cy.get('.btn-submit')
            .should('be.visible')
            .click();
        cy.get('[id="pagarme-checkout-container"]')
        //TODO - fazer a confirmação do checkout para o PagarMe
});