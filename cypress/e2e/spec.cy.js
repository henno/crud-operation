describe('', () => {
  it('Checks for users', () => {
    cy.visit('localhost:3000');

    cy.get('.table').first().should('contain.text', 'Bret');

    cy.get('.table').last().should('contain.text', 'Moriah.Stanton')
  })

  it ('deletes user', () => {

    cy.visit('localhost:3000');

    cy.get('tr:nth-child(2) .btn-danger').should('contain.text','Remove').click();

    cy.get('.table [key=2]').should('not.exist');

  })

  it('Editing user', () => {

    cy.visit('localhost:3000');

    cy.get('tr:nth-child(8) .btn-primary').should('contain.text','Edit User').click();

    cy.get('input[name=name]').type('Taavi').should('have.value', 'Taavi');

    cy.get('input[name=username]').type('Taavi2020').should('have.value', 'Taavi2020');

    cy.get('input[name=email]').type('Taavi@hot.ee').should('have.value', 'Taavi@hot.ee');

    cy.get('button[type=submit]').should('contain.text', 'Update').click();

    cy.get('.btn-close').click();

    cy.get('table').last().should('contain.text', 'Taavi');

  })
    it('adding user', () => {

      cy.visit('http://localhost:3000/');

      cy.get('.container > .btn').click();

      cy.get('#name').type('Jaagup').should('have.value', 'Jaagup');

      cy.get('#username').type('Kreem').should('have.value', 'Kreem');

      cy.get('#email').type('Kreem@hot.ee').should('have.value', 'Kreem@hot.ee');

      cy.get('.modal-footer > .btn-primary').click();

      cy.get('.btn-close').click();

      cy.get('table').first().should('contain.text', 'Jaagup');
  })
})


