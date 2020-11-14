describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Wille Cat',
      username: 'willi',
      password: 'food'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('blogs')
    cy.contains('login')
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('willi')
      cy.get('input:last').type('food')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create new post').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('nobody')
      cy.get('#url').type('wwweb')
      cy.get('#newBlog').click()
      cy.contains('A new blog: a blog created by cypress, by:nobody added!')
      cy.contains('a blog created by cypress')
    })
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('willi')
      cy.get('input:last').type('food')
      cy.contains('login').click()

      cy.contains('Wille Cat logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('input:first').type('tusse')
      cy.get('input:last').type('food')
      cy.contains('login').click()

      cy.get('.error')
        .should('contain', 'wrong username and/or password! Try again!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Wille Cat logged in!')
    })
  })

})