/// <reference types="Cypress" />

describe('Pagination in users accounts', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i <= 20; ++i) {
            items.push({
                id: i + "",
                connection_metadata_id: "c1",
            });
        }
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users_accounts'
            },
            {"items": items}
        ).as("getUsersAccounts");
        cy.visit('/users_accounts');
    })

    it('Number of rows should be max page size', () => {
        cy.wait('@getUsersAccounts');

        cy.get("div[role=row]").should('have.length', 15 + 1);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1");
            cy.contains("div[role=row]", "15");
        });
    })

    it('Go to next page', () => {
        cy.wait('@getUsersAccounts');

        cy.get("button[title~=Next]").click();

        cy.get("div[role=row]").should('have.length', 5 + 1);
        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "16");
            cy.contains("div[role=row]", "20");
        });
    })
});
