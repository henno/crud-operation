describe('Test 1', () => {
  it('Check for users', () => {
    cy.visit('localhost:3000');

    cy.get('.table').first().should('contain.text', 'Bret');

    cy.get('.table').last().should('contain.text', 'Moriah.Stanton')

  })
})

describe('Remove, update and add', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get('html').click();
    cy.get('tr:nth-child(10) .btn-danger').click();
    cy.get('tr:nth-child(9) .btn-danger').click();
    cy.get('tr:nth-child(8) .btn-primary').click();
    cy.get('#name').click();
    cy.get('#name').type('jaagup');
    cy.get('#username').type('kreem');
    cy.get('#email').type('kreem@hot.ee');
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('.btn-close').click();
    cy.get('.container > .btn').click();
    cy.get('#name').click();
    cy.get('#name').type('tiit');
    cy.get('#username').type('marvel');
    cy.get('#email').type('marvel@hot.ee');
    cy.get('.modal-footer > .btn-primary').click();
    cy.get('.btn-close').click();
  })
})


