describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, Cypress.env('user'))
    cy.visit('')
  })

  it('Login form is shown by default', function () {
    cy.contains('blogs')
    cy.contains('log in')
  })

  describe('Login', function () {
    it('loging with wrong credentials fails', function () {
      cy.contains('log in').click()
      cy.get('#login').type('wrong user')
      cy.get('#password').type('wrong password')
      cy.get('#log-in-button').click()

      cy.contains('invalid username or password')
    })

    it('login with correct credentials succeeds', function () {
      cy.contains('log in').click()
      cy.get('#login').type('123')
      cy.get('#password').type('123')
      cy.get('#log-in-button').click()

      cy.contains('user 123 logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      console.log(Cypress.env('user'))
      cy.login(Cypress.env('user'))
    })

    it('a new blog can be added', function () {
      cy.contains('New Blog').click()
      cy.get('#title').type('testing new blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')

      cy.get('#createBlog').click()

      cy.get('.notification').should('contain', 'New blog added!')
      cy.contains('testing new blog by test author')
    })
  })
})
