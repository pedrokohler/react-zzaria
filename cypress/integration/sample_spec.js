Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('My first test', () => {
  it("Doesn't do much", () => {
    cy.visit('https://app.sicessolar.com');
    cy.contains('Entrar').click({ force: true });
    cy.get('#username').type('pedro.kohler@sicesbrasil.com.br');
    cy.get('#password').type('senhaplataformasices');
    cy.get('.btn.registrate.sign-in-btn').click({ force: true });
    // cy.url().should('include', '/commands/actions');
  });
});
