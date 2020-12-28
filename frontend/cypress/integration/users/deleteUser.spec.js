/// <reference types="Cypress" />

describe('Delete user', () => {
    beforeEach(() => {
        const items = [];
        for(var i = 1; i <= 5; ++i) {
            items.push({
                id: i + "",
                name: "user" + i,
            });
        }
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users'
            },
            {"items": items}
        ).as("getUsers");
        cy.intercept(
            {
                method: 'DELETE',
                url: 'http://localhost:8080/users/*'
            },
            {}
        ).as("deleteUser");

        cy.visit('/users');
    })

    it('Delete first user', () => {
        cy.wait('@getUsers');

        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", "1").within(() => {
                cy.get("button[aria-label=delete]").click();
            });
        });

        cy.contains("button", "Delete").click();

        cy.wait('@deleteUser').then((interception) => {
            assert.isTrue(interception.request.url.includes("/users/1"), 'Correct user id in URL');
        });
    })

    // TODO - cancel delete
});
