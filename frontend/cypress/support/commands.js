Cypress.Commands.add("selectValueInMaterialUISelect", (selectId, labelId, value) => {
    cy.get(`#${selectId}`).click();
    cy.get(`ul[aria-labelledby=${labelId}]`).within(() => {
        cy.get(`li[data-value=${value}]`).click();
    });
});

Cypress.Commands.add("selectValueInMaterialUIAutocomplete", (elementId, labelValue) => {
    cy.get(`#${elementId}`).type(labelValue).type("{downarrow}").type("{enter}");
});
