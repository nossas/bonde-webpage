describe('Incubation Form', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('fill form', () => {
        cy.get('[name ="input-field-1552312909841-49"]')
            .should('be.visible').type('Nome');
        cy.get('[name ="input-field-1552312920353-15"]')
            .should('be.visible')
            .type('email@exemplo.com');
        cy.get('[name ="input-field-1552312933368-45"]')
            .should('be.visible').select("Norte");   
        
        //send button    
        cy.get('.css-1nf0hlf')
            .should('be.visible')
            .click();
        
        //confirmation    
        cy.get('.css-aomufq > img')
            .should('be.visible');
    });
    it('fill form without name ', () => {
         cy.get('[name ="input-field-1552312920353-15"]').should('be.visible')
            .type('email@exemplo.com');
        cy.get('[name ="input-field-1552312933368-45"]')
            .should('be.visible').select("Norte");   
        
        //send button    
        cy.get('.css-1nf0hlf')
            .should('be.visible')
            .click();
        
        //require field  
        cy.get('.css-60k78l > p')
            .should('be.visible');
    });    
});