/// <reference types="Cypress" />

describe('View datasets', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/datasets'
            },
            {"items": [
                {
                    id: "1",
                    description: "d1",
                    connection_metadata_id: "c1",
                },
                {
                    id: "2",
                    description: "d2",
                    connection_metadata_id: "c1",
                },                
            ]}
        ).as("getDataSets");
        cy.visit('/datasets');
    })

    it('Number of rows should be as returned by API', () => {
        cy.wait('@getDataSets');

        cy.get("div[role=row]").should('have.length', 3);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.contains("div[role=cell]", "d1");
                cy.contains("div[role=cell]", "c1");
            });

            cy.contains("div[role=row]", "2").within(() => {
                cy.contains("div[role=cell]", "d2");
                cy.contains("div[role=cell]", "c1");
            });            
        });
    })
});
