describe('Pruebas escenario modificar página', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba modificar un página estado Draf', () => {
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
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').clear()
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type('Mi Primera página modificada')
        cy.wait(1000)
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').clear()
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').type('Mauris aliquam placerat ligula, eget laoreet lectus pretium quis. Sed nulla nunc, faucibus ac nibh ut, sodales efficitur tortor. Phasellus lacinia justo elit, nec feugiat turpis mollis vel. Fusce ac nunc in elit blandit scelerisque. Vestibulum non tincidunt purus. Sed eget dignissim odio, vitae laoreet risus. Aliquam justo tellus, lobortis eu quam ut, elementum vehicula lacus.')
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi Primera página modificada')
        cy.get('span.gh-content-status-draft.gh-badge.gh-badge-purple.nowrap').then(($estadoPage) => {
            return $estadoPage[0].outerText
        }).should('eq', 'DRAFT')
    })

    it('Prueba modificar un página estado Published', () => {
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
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').clear()
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type('Mi Primera página publicada modificada')
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').clear()
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').type('Vestibulum scelerisque orci nec vestibulum suscipit. Phasellus ac massa consequat, cursus massa ultricies, aliquet odio. Fusce sed quam magna. Mauris ullamcorper semper sem at sollicitudin. Nulla posuere quis dui sit amet molestie. Pellentesque faucibus, tellus nec venenatis tincidunt, felis tortor cursus magna, vel commodo nulla augue et dolor. Duis lacinia metus in aliquam faucibus. In sit amet dolor suscipit ligula vehicula sollicitudin aliquet ut urna. Sed sed quam maximus, porttitor magna at, ultricies felis. In tincidunt et massa a gravida. Etiam est mauris, vestibulum eu interdum et, hendrerit quis ex. Suspendisse a lacus urna.')
        cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
        cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
        cy.wait(4000)
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi Primera página publicada modificada')
        cy.get('span.gh-content-status-published.nowrap').then(($estadoPage) => {
            return $estadoPage[0].outerText
        }).should('eq', 'PUBLISHED')
    })

    function loginUser(cy, email, password) {
        cy.get('#ember8').type(email)
        cy.get('#ember10').type(password)
        cy.get('#ember12').click()
        cy.wait(1000)
      }
})