Cypress.Commands.add("selectValueInMaterialUISelect", (selectId, labelId, value) => {
    cy.get(`#${selectId}`).click();
    cy.get(`ul[aria-labelledby=${labelId}]`).within(() => {
        cy.get(`li[data-value=${value}]`).click();
    });
});
