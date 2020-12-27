/// <reference types="Cypress" />

describe('Pagination in connections', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i < 20; ++i) {
            items.push({
                id: i + "",
                data_source_type: "redshift",
                description: "d" + i,
                secret_reference_to_connect: "s" + i,
            });
        }
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/connections'
            },
            {"items": items}
        ).as("getConnections");
        cy.visit('/connections');
    })

    it('Number of rows should be max page size', () => {
        cy.wait('@getConnections');

        cy.get("div[role=row]").should('have.length', 5 + 1);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1");
            cy.contains("div[role=row]", "5");
        });
    })

    it('Go to next page', () => {
        cy.wait('@getConnections');
        cy.get("div[role=row]").should('have.length', 5 + 1);

        cy.get("button[title~=Next]").click();

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "6");
            cy.contains("div[role=row]", "10");
        });
    })
});
