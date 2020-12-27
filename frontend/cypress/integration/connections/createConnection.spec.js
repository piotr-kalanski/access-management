/// <reference types="Cypress" />

describe('Create connection', () => {
    beforeEach(() => {      
        cy.intercept(
            {
                method: 'GET',
                url: 'http://localhost:8080/connections'
            },
            {"items": []}
        );  
        cy.visit('/connections');
    })

    it('Add connection button', () => {
        cy.contains('button', 'New connection').should('exist');
    })

    // TODO - test with empty value
    // TODO - cancel adding new connection

    it('Create new connection', () => {
        // given input fields
        const description = "d1";
        const dataSourceType = "redshift";
        const secretReference = "secret";

        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8080/connections'
        }, {
            id: "1",
            data_source_type: dataSourceType,
            description,
            secret_reference_to_connect: secretReference
        }).as('apiCreateConnection')

        // when add new connection
        cy.contains('button', 'New connection').click();
        cy.get("#description").type(description);
        cy.selectValueInMaterialUISelect("connection-type", "connection-type-label", dataSourceType);
        cy.get("#secret-reference-to-connect").type(secretReference);
        cy.contains('button', 'Create').click();

        // then - api was called
        cy.wait('@apiCreateConnection').then((interception) => {
            assert.isNotNull(interception.response.body, 'Create request was send');
            assert.isTrue(interception.request.body.includes(description), 'Description is in request body');
            assert.isTrue(interception.request.body.includes(dataSourceType), 'Data Source type is in request body');
            assert.isTrue(interception.request.body.includes(secretReference), 'Secret reference is in request body');
        });

        // then new connection is visible in connections table
        cy.get("div[role=grid]").within(() => {
            cy.contains("div[role=row]", description).within(() => {
                cy.contains("div[role=cell]", dataSourceType);
                cy.contains("div[role=cell]", secretReference);
            });
        });
    })
});
