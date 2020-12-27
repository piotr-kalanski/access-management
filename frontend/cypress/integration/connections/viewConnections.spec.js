/// <reference types="Cypress" />

describe('View connections', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/connections'
            },
            {"items": [
                {
                    id: "1",
                    data_source_type: "redshift",
                    description: "d1",
                    secret_reference_to_connect: "s1",
                },
                {
                    id: "2",
                    data_source_type: "redshift",
                    description: "d2",
                    secret_reference_to_connect: "s2",
                },                
            ]}
        ).as("getConnections");
        cy.visit('/connections');
    })

    it('Number of rows should be as returned by API', () => {
        cy.wait('@getConnections');

        cy.get("div[role=row]").should('have.length', 3);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.contains("div[role=cell]", "d1");
                cy.contains("div[role=cell]", "s1");
            });

            cy.contains("div[role=row]", "2").within(() => {
                cy.contains("div[role=cell]", "d2");
                cy.contains("div[role=cell]", "s2");
            });            
        });
    })
});
