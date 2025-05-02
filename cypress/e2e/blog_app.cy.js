describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'One Two Three',
      username: '123',
      password: '123',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:5173')
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
})
