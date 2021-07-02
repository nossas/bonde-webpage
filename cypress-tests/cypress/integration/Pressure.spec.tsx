describe('Make Pressure', () => {
    beforeEach(() => {
        cy.visit('http://www.teste-de-widgets.staging.bonde.org/')
    });
    it('Fill pressure form', () => {
        cy.get('[name ="name"]')
            .should('be.visible').type('Nome');
        cy.get('[name ="email"]').should('be.visible')
            .type('email@exemplo.com');
        cy.get('[name ="lastname"]')
            .should('be.visible').type('Sobrenome');
        cy.get('[name ="city"]')
            .should('be.visible').type('Cidade');
        
        //send email button    
        cy.get('.sc-AxheI')
            .should('be.visible')
            .click();
        
        //confirmation    
        cy.get('.css-aomufq > img')
            .should('be.visible');
    });

    it('incomplete fill form without name', () => { 
        cy.get('[name ="email"]') .should('be.visible') 
        .type('email@exemplo.com'); 
        cy.get('[name ="lastname"]') 
        .should('be.visible') .type('Sobrenome'); 
        cy.get('[name ="city"]') 
        .should('be.visible') .type('Cidade') ;
        cy.get('.sc-AxheI') 
        .should('be.visible') 
        .click();

        //required field 
        cy.get('.sc-fzpjYC') 
        .should('be.visible');    
    });
});