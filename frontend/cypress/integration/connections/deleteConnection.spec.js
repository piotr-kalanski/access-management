/// <reference types="Cypress" />

describe('Delete connection', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i <= 5; ++i) {
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
        cy.intercept(
            {
                method: 'DELETE',
                url: 'http://localhost:8080/connections/*'
            },
            {}
        ).as("deleteConnection");

        cy.visit('/connections');
    })

    it('Delete first connection', () => {
        cy.wait('@getConnections');

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.get("button[aria-label=delete]").click();
            });
        });

        cy.contains("button", "Delete").click();

        cy.wait('@deleteConnection').then((interception) => {
            assert.isTrue(interception.request.url.includes("/connections/1"), 'Correct connection id in URL');
        });
    })

    // TODO - cancel delete
});
