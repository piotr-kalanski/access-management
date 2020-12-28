/// <reference types="Cypress" />

describe('View users', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users'
            },
            {"items": [
                {
                    id: "1",
                    name: "u1",
                },
                {
                    id: "2",
                    name: "u2",
                },                
            ]}
        ).as("getUsers");
        cy.visit('/users');
    })

    it('Number of rows should be as returned by API', () => {
        cy.wait('@getUsers');

        cy.get("div[role=row]").should('have.length', 3);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.contains("div[role=cell]", "u1");
            });

            cy.contains("div[role=row]", "2").within(() => {
                cy.contains("div[role=cell]", "u2");
            });            
        });
    })
});
