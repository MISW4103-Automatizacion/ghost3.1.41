describe('Pruebas escenario crear tag', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba crear un tag', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-btn.gh-btn-green span').then(($btnCrearPage) => {
            return $btnCrearPage[0]
        }).click()
        cy.get('#tag-name').type('Mi tag de literatura')
        cy.get('#tag-description').type('Este tag sirve para categorizar mi contenido por tipo literatura')
        cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click()
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.get('a.ember-view.gh-list-data.gh-tag-list-title.gh-list-cellwidth-70').then(($titleTag) => {
            return $titleTag[1].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi tag de literatura')        
    })

    it('Prueba asociar un tag a un post', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[0]
        }).click()
        cy.wait(4000)
        cy.get('a.ember-view.gh-btn.gh-btn-green span').then(($btnCrearPage) => {
            return $btnCrearPage[0]
        }).click()
        createPost(cy, '¿Por qué lo usamos?', 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).')
        publishPost(cy)
        cy.get('button.post-settings').click()
        cy.get('input.ember-power-select-trigger-multiple-input').then(($putTag) => {
            return $putTag[0]
        }).click()
        cy.get('li.ember-power-select-option').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('button.close.settings-menu-header-action').click()
        cy.wait(4000)
        cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
        cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
        cy.wait(4000)
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('ul.gh-nav-list.gh-nav-manage li a.ember-view').then(($menuPage) => {
            return $menuPage[6]
        }).click()
        cy.get('a.ember-view.gh-list-data.blue.gh-tag-list-posts-count.gh-list-cellwidth-10.f8').then(($selTag) => {
            return $selTag[1]
        }).click()
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', '¿Por qué lo usamos?')
        cy.get('span.gh-content-status-published.nowrap').then(($postEstado) => {
            return $postEstado[0].outerText
        }).should('eq', 'PUBLISHED')
    })

    function publishPost(cy){
        cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
        cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
        cy.wait(4000)
    }
    
    function createPost(cy, title, body) {
        cy.get('textarea.gh-editor-title').type(title)
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').type(body)
        cy.wait(1000)
    }


    function loginUser(cy, email, password) {
    cy.get('#ember8').type(email)
    cy.get('#ember10').type(password)
    cy.get('#ember12').click()
    cy.wait(1000)
    }
})