describe('Pruebas escenario ingreso aplicación', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
    })

    it('Prueba Registrar usuario', () => {
      cy.get('main').then(($main) => {
        if($main.find('form').length == 0){
          createUser(cy)
          inviteYourTeam(cy, 'af.ostor10@uniandes.edu.co')
          cy.title().should('eq', 'Site - Mi primer blog')
        }
      })
    })
    
    it('Prueba Ingreso aplicación exitoso', () => {
        cy.get('main').then(($main) => {
          if($main.find('form').length > 0){
            if($main.find('form')[0].id == 'login') {
              loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
              cy.title().should('eq', 'Site - Mi primer blog')
            }
          }
        })
    })

    it('Prueba Ingreso aplicación email erroneo', () => {
      cy.get('main').then(($main) => {
        if($main.find('form').length > 0){
          if($main.find('form')[0].id == 'login') {
            loginUser(cy, 'mc.gomezt1@uniandes.edu', '123456')
            cy.get('.main-error').should('contain', 'There is no user with that email address.')
          }
        }
      })
    })

    it('Prueba Ingreso aplicación password erroneo', () => {
      cy.get('main').then(($main) => {
        if($main.find('form').length > 0){
          if($main.find('form')[0].id == 'login') {
            loginUser(cy, 'mc.gomezt1@uniandes.edu.co', '123456')
            cy.get('.main-error').should('contain', 'Your password is incorrect.')
          }
        }
      })
    })

    it('Prueba Ingreso aplicación forgot password', () => {
      cy.get('main').then(($main) => {
        if($main.find('form').length > 0){
          if($main.find('form')[0].id == 'login') {
            forgotPassword(cy, 'mc.gomezt1@uniandes.edu.co')
            cy.get('.main-error').should('contain', 'Failed to send email. Reason:')
          }
        }
      })
    })

    function loginUser(cy, email, password) {
      cy.get('#ember8').type(email)
      cy.get('#ember10').type(password)
      cy.get('#ember12').click()
      cy.wait(1000)
    }

    function createUser(cy) {
      cy.get('#ember12').click()
      cy.get('#blog-title').type("Mi primer blog")
      cy.get('#name').type("Milton Gómez Triviño")
      cy.get('#email').type("mc.gomezt1@uniandes.edu.co")
      cy.get('#password').type("Tagamandapio123@")
      cy.get('#ember29').click()
      cy.wait(1000)
    }

    function inviteYourTeam(cy, email) {      
      cy.get('#ember34').type(email)
      cy.get('#ember35').click()
      cy.wait(1000)
    }

    function forgotPassword(cy, email) {      
      cy.get('#ember8').type(email)
      cy.get('#ember11').click()
      cy.wait(1000)
    }
  })
