describe('Pruebas escenario eliminar tag', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba eliminar un tag', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-list-data.gh-tag-list-title h3').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.mb15').then(($delTag) => {
            return $delTag[1]
        }).click()
        cy.get('button.gh-btn.gh-btn-red.gh-btn-icon.ember-view').then(($cofDelTag) => {
            return $cofDelTag[0]
        }).click()
        
    })

    function loginUser(cy, email, password) {
        cy.get('#ember8').type(email)
        cy.get('#ember10').type(password)
        cy.get('#ember12').click()
        cy.wait(1000)
    }
})