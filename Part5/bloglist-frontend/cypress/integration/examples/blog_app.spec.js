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

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('willi')
      cy.get('input:last').type('food')
      cy.contains('login').click()

      cy.contains('Wille Cat logged in')
      cy.get('.notification')
        .should('contain', 'Welcome Wille Cat')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'willi', password: 'food' })
    })

    it('A blog can be created', function () {
      cy.contains('Create new post').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('nobody')
      cy.get('#url').type('wwweb')
      cy.get('#newBlog').click()
      cy.contains('a blog created by cypress')

      cy.get('.notification')
        .should('contain', 'A new blog: a blog created by cypress, by:nobody added!')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'a blog created by cypress',
          author: 'nobody',
          url: 'wwweb',
          likes: 2
        })
        cy.createBlog({
          title: 'a second blog',
          author: 'cypress',
          url: 'web',
          likes: 0
        })
      })
      it('a blog can be liked', function () {
        cy.get('#view').click()
        cy.get('#like').click()
        cy.get('.notification')
          .should('contain', 'Like added to post!')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('a blog can be deleted', function () {
        cy.get('#view').click()
        cy.get('#remove').click()
        cy.get('.error')
          .should('contain', 'a blog created by cypress deleted!')
          .and('have.css', 'color', 'rgb(255, 0, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('blogs are ordered according to likes', function () {
        cy.contains('a blog created by cypress')
        cy.contains('a second blog')
      })
    })
  })
})