describe('Make Pressure', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    
    Cypress._.times(1,(i) => { 
        it('Fill pressure form', () => {
            cy.get('[name ="name"]')
                .should('be.visible').type('Nome');
            cy.get('[name ="email"]').should('be.visible')
                .type(i + 'email@exemplo.com');
            cy.get('[name ="lastname"]')
                .should('be.visible').type('Sobrenome');
            cy.get('[name ="city"]')
                .should('be.visible').type('Cidade');
            cy.get('[name ="state"]')
                .should('be.visible').select('MG');

            //send email button    
            cy.get('.sc-fzqBZW')
                .should('be.visible')
                .click();
        
            //confirmation    
            cy.get('.css-aomufq > img')
                .should('be.visible');
        });
    });

    it('incomplete fill form without name', () => { 
        cy.get('[name ="email"]') .should('be.visible') 
            .type('email@exemplo.com'); 
        cy.get('[name ="lastname"]') 
            .should('be.visible') .type('Sobrenome'); 
        cy.get('[name ="city"]') 
            .should('be.visible') .type('Cidade') ;
        cy.get('[name ="state"]')
            .should('be.visible').select('MG');
        cy.get('.sc-fzqBZW') 
            .should('be.visible') 
            .click();

        //required field 
        cy.get(':nth-child(3) > .sc-fzqPZZ > .sc-fzqBkg')
            .should('be.visible');    
    });
});