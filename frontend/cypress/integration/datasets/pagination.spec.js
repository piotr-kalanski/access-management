/// <reference types="Cypress" />

describe('Pagination in datasets', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i <= 20; ++i) {
            items.push({
                id: i + "",
                description: "d" + i,
                connection_metadata_id: "c1",
            });
        }
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/datasets'
            },
            {"items": items}
        ).as("getDataSets");
        cy.visit('/datasets');
    })

    it('Number of rows should be max page size', () => {
        cy.wait('@getDataSets');

        cy.get("div[role=row]").should('have.length', 15 + 1);

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1");
            cy.contains("div[role=row]", "15");
        });
    })

    it('Go to next page', () => {
        cy.wait('@getDataSets');

        cy.get("button[title~=Next]").click();

        cy.get("div[role=row]").should('have.length', 5 + 1);
        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "16");
            cy.contains("div[role=row]", "20");
        });
    })
});
