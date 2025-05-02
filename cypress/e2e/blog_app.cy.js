describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown by default', function () {
    cy.contains('blogs')
    cy.contains('log in')
  })
})
