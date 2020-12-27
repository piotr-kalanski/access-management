/// <reference types="Cypress" />

describe('Connections Management', () => {
    beforeEach(() => {        
        cy.visit('/connections');
    })

    it('Add connection button', () => {
        cy.contains('button', 'New connection').should('exist');
    })

    // TODO - test with empty value
    // TODO - cancel adding new connection

    it('Create new connection', () => {
        // given input fields
        const description = "d1";
        const dataSourceType = "redshift";

        // when add new connection
        cy.contains('button', 'New connection').click();
        cy.get("#description").type(description);
        cy.selectValueInMaterialUISelect("connection-type", "connection-type-label", dataSourceType);
        cy.contains('button', 'Create').click();

        // then new connection is visible in connections table
        // cy.get("div[role=grid]").within(() => {
        //     cy.contains("div[role=row]", description).contains(dataSourceType);
        // });
    })    
})