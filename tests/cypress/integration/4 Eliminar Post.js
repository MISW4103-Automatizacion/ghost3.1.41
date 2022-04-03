describe('Pruebas escenario eliminar post', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba eliminar un post estado Draf', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('#ember28').click()
        cy.wait(1000)
        cy.get('span.flex.items-center.svg-midgrey').then(($menuPost) => {
            return $menuPost[0]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0]
        }).click()
        cy.get('button.post-settings').click()
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').then(($postEliminar) => {
            return $postEliminar[0]
        }).click()
        cy.get('div.no-posts').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'No posts match the current filter')
    })
    
    it('Prueba eliminar un post estado Published', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('#ember28').click()
        cy.wait(1000)
        cy.get('span.flex.items-center.svg-midgray').then(($menuPost) => {
            return $menuPost[0]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0]
        }).click()
        cy.get('button.post-settings').click()
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').then(($postEliminar) => {
            return $postEliminar[0]
        }).click()
    })

    function loginUser(cy, email, password) {
      cy.get('#ember8').type(email)
      cy.get('#ember10').type(password)
      cy.get('#ember12').click()
      cy.wait(1000)
    }
  })