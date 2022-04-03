describe('Pruebas escenario crear menú', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba crear un menú principal y asociarlo a una página estado Publish', () => {
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
        cy.wait(4000)
        cy.get('ul.gh-nav-list.gh-nav-settings li').then(($menuPage) => {
            return $menuPage[2]
        }).click()
        cy.get('input.ember-text-field.gh-input.ember-view').then(($strMenu) => {
            return $strMenu[8]
        }).type('Mi página')
        cy.get('input.ember-text-field.gh-input.ember-view').then(($strMenu) => {
            return $strMenu[9]
        }).type('mi-primera-pagina-publicada')
        cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').then(($saveMenu) => {
            return $saveMenu[0]
        }).click()
        cy.visit('http://localhost:2368/mi-primera-pagina-publicada')
        cy.url().should('eq','http://localhost:2368/mi-primera-pagina-publicada/')
    })

    it('Prueba crear un menú secuandario asociarlo a un tag', () => {
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
            return $titleTag[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', 'Mi tag de literatura')
        cy.wait(4000)
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
        cy.get('ul.gh-nav-list.gh-nav-settings li').then(($menuPage) => {
            return $menuPage[2]
        }).click()
        cy.get('input.ember-text-field.gh-input.ember-view').then(($strMenu) => {
            return $strMenu[12]
        }).type('Mis tags')
        cy.get('input.ember-text-field.gh-input.ember-view').then(($strMenu) => {
            return $strMenu[13]
        }).type('tag/mi-tag-de-literatura')
        cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').then(($saveMenu) => {
            return $saveMenu[0]
        }).click()
        cy.visit('http://localhost:2368/tag/mi-tag-de-literatura')
        cy.url().should('eq','http://localhost:2368/tag/mi-tag-de-literatura/')
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