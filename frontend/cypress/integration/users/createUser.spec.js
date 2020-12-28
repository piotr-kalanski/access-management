/// <reference types="Cypress" />

describe('Create user', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/users'
            },
            {"items": []}
        );  
        cy.visit('/users');
    })

    it('Add user button', () => {
        cy.contains('button', 'New user').should('exist');
    })

    // TODO - test with empty value
    // TODO - cancel adding new user

    it('Create new user', () => {
        // given input fields
        const newId = "1";
        const name = "user1";

        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8080/users'
        }, {
            id: newId,
            name,
        }).as('apiCreateUser')

        // when add new user
        cy.contains('button', 'New user').click();
        cy.get("#name").type(name);
        cy.contains('button', 'Create').click();

        // then - api was called
        cy.wait('@apiCreateUser').then((interception) => {
            assert.isNotNull(interception.response.body, 'Create request was send');
            assert.isTrue(interception.request.body.includes(name), 'Name is in request body');
        });

        // then new user is visible in users table
        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", newId).within(() => {
                cy.contains("div[role=cell]", name);
            });
        });
    })
});
