describe('Pruebas escenario modificar tag', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba modificar un tag', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-list-data.gh-tag-list-title h3').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('#tag-name').clear()
        cy.get('#tag-description').clear()
        cy.get('#tag-name').type('Mi tag de ipsum lorem')
        cy.get('#tag-description').type('Este tag sirve para categorizar mi contenido por tipo ipsum lorem')
        cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click()
        cy.wait(4000)
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.get('a.ember-view.gh-list-data.blue.gh-tag-list-posts-count.gh-list-cellwidth-10.f8').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($findTag) => {
            return $findTag[0].getElementsByTagName('p')[0].getElementsByTagName('span')[2].outerText
        }).should('eq', 'Mi tag de ipsum lorem')        
    })

    it('Prueba desasociar un tag a un post', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.get('a.ember-view.gh-list-data.blue.gh-tag-list-posts-count.gh-list-cellwidth-10.f8').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($selPost) => {
            $selPost[0].click()
            cy.wait(4000)
            cy.get('button.post-settings').click()
            cy.get('li.ember-power-select-multiple-option.tag-token.js-draggableObject.draggable-object.ember-view span').then(($putTag) => {
                return $putTag[0]
            }).click()
            cy.get('button.close.settings-menu-header-action').click()
            cy.wait(4000)
            cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
            cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
            cy.wait(4000)
            cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        })
        cy.get('div.no-posts').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'No posts match the current filter')        
    })

    function loginUser(cy, email, password) {
        cy.get('#ember8').type(email)
        cy.get('#ember10').type(password)
        cy.get('#ember12').click()
        cy.wait(1000)
    }
})