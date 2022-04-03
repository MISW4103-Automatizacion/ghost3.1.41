describe('Pruebas escenario eliminar página', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba eliminar un página estado Draf', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[5]
        }).click()
        cy.wait(4000)
        cy.get('div.gh-contentfilter div.gh-contentfilter-menu.gh-contentfilter-type').then(($selectPageEstado) => {
            return $selectPageEstado[0]
        }).click()        
        cy.get('li.ember-power-select-option').then(($filtroPageEstado) => {
            return $filtroPageEstado[1]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($selectPage) => {
            return $selectPage[0]
        }).click()
        cy.get('button.post-settings').click()
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').then(($postEliminar) => {
            return $postEliminar[0]
        }).click()
        cy.get('div.no-posts').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'No pages match the current filter')
    })

    it('Prueba eliminar un página estado Published', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[5]
        }).click()
        cy.wait(4000)
        cy.get('div.gh-contentfilter div.gh-contentfilter-menu.gh-contentfilter-type').then(($selectPageEstado) => {
            return $selectPageEstado[0]
        }).click()        
        cy.get('li.ember-power-select-option').then(($filtroPageEstado) => {
            return $filtroPageEstado[2]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($selectPage) => {
            return $selectPage[0]
        }).click()
        cy.get('button.post-settings').click()
        cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').then(($postEliminar) => {
            return $postEliminar[0]
        }).click()
        cy.get('div.no-posts').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'No pages match the current filter')
    })

    function loginUser(cy, email, password) {
        cy.get('#ember8').type(email)
        cy.get('#ember10').type(password)
        cy.get('#ember12').click()
        cy.wait(1000)
      }
})