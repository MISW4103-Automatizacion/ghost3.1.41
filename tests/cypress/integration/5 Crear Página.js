describe('Pruebas escenario crear página', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba crear un página estado Draf', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[5]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-btn.gh-btn-green span').then(($btnCrearPage) => {
            return $btnCrearPage[0]
        }).click()
        cy.wait(4000)
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type('Mi Primera página')
        cy.get('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type('El trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de "de Finibus Bonorum et Malorum" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.')
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi Primera página')
        cy.get('span.gh-content-status-draft.gh-badge.gh-badge-purple.nowrap').then(($estadoPage) => {
            return $estadoPage[0].outerText
        }).should('eq', 'DRAFT')
    })

    it('Prueba crear un página estado Publish', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[5]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-btn.gh-btn-green span').then(($btnCrearPage) => {
            return $btnCrearPage[0]
        }).click()
        cy.wait(4000)
        cy.get('textarea.gh-editor-title.ember-text-area.gh-input.ember-view').type('Mi Primera página publicada')
        cy.get('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. In at risus at magna eleifend sollicitudin a elementum leo. Nullam urna justo, commodo ac tempor a, fermentum placerat felis. Pellentesque ac mauris sed erat venenatis convallis. Integer lectus turpis, lobortis vulputate orci a, fringilla tempor nulla. Nunc malesuada, erat a semper ultrices, leo tortor convallis sem, at pharetra diam arcu ac turpis. Suspendisse mi magna, semper vitae hendrerit ac, fermentum non nibh. Aliquam non ante convallis, placerat nisi ut, malesuada elit. Aenean tristique vestibulum mauris, ac tempor erat congue ut. Donec non aliquam magna. Morbi eget ex iaculis, fringilla enim sed, hendrerit ex. Curabitur mollis accumsan nulla. Phasellus malesuada felis quis sapien ornare ultrices. Vestibulum vestibulum a purus at consequat. Curabitur sit amet tortor tincidunt, vulputate quam sed, pulvinar mi. In mattis sed felis ac tincidunt. Integer nec tortor pulvinar, ultricies massa at, commodo nibh.')
        cy.wait(4000)
        cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
        cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
        cy.wait(4000)
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.wait(4000)
        cy.get('div.gh-contentfilter div.gh-contentfilter-menu.gh-contentfilter-type').then(($selectPageEstado) => {
            return $selectPageEstado[0]
        }).click()        
        cy.get('li.ember-power-select-option').then(($filtroPageEstado) => {
            return $filtroPageEstado[2]
        }).click()        
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi Primera página publicada')
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