/// <reference types="Cypress" />

describe('Pagination in users', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i <= 20; ++i) {
            items.push({
                id: i + "",
                name: "u" + i,
            });
        }
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users'
            },
            {"items": items}
        ).as("getUsers");
        cy.visit('/users');
    })

    it('Number of rows should be max page size', () => {
        cy.wait('@getUsers');

        cy.get("div[role=row]").should('have.length', 15 + 1);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1");
            cy.contains("div[role=row]", "15");
        });
    })

    it('Go to next page', () => {
        cy.wait('@getUsers');

        cy.get("button[title~=Next]").click();

        cy.get("div[role=row]").should('have.length', 5 + 1);
        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "16");
            cy.contains("div[role=row]", "20");
        });
    })
});
