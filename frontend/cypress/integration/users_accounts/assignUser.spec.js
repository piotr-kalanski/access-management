/// <reference types="Cypress" />

describe('Assign user to user account', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users_accounts'
            },
            {"items": [
                {
                    id: "a1",
                    connection_metadata_id: "c1",
                },
                {
                    id: "a2",
                    connection_metadata_id: "c2",
                },                
            ]}
        ).as("getUsersAccounts");

        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users'
            },
            {"items": [
                {
                    id: "u1",
                    name: "user1",
                },
                {
                    id: "u2",
                    name: "user2",
                },                
            ]}
        ).as("getUsers");

        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8080/users/assign'
        }, {}).as('assignUser')

        cy.visit('/users_accounts');
    })

    it('Assign user', () => {
        cy.wait('@getUsersAccounts');

        cy.contains("div[role=row]", "a1").within(() => {
            cy.contains('button', 'Assign').click();
        });

        cy.wait('@getUsers');

        cy.selectValueInMaterialUIAutocomplete("user-id", "user1");

        cy.get("div[role=dialog]").within(() => {
            cy.contains("button", "Assign").click();
        });

        cy.wait('@assignUser').then((interception) => {
            assert.isNotNull(interception.response.body, 'Assign user account request was send');
            assert.isTrue(interception.request.body.includes("a1"), 'Account id is in request body');
            assert.isTrue(interception.request.body.includes("u1"), 'User id is in request body');
            assert.isTrue(interception.request.body.includes("c1"), 'Connection id is in request body');
        });

        // TODO - not changed?
        //cy.contains("div[role=cell]", "u1");
    })

    // TODO - test empty user id
    // TODO - test cancel
});
