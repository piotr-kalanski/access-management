/// <reference types="Cypress" />

describe('View users accounts', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users_accounts'
            },
            {"items": [
                {
                    id: "1",
                    connection_metadata_id: "c1",
                },
                {
                    id: "2",
                    connection_metadata_id: "c2",
                },                
            ]}
        ).as("getUsersAccounts");
        cy.visit('/users_accounts');
    })

    it('Number of rows should be as returned by API', () => {
        cy.wait('@getUsersAccounts');

        cy.get("div[role=row]").should('have.length', 3);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.contains("div[role=cell]", "c1");
            });

            cy.contains("div[role=row]", "2").within(() => {
                cy.contains("div[role=cell]", "c2");
            });            
        });
    })
});
