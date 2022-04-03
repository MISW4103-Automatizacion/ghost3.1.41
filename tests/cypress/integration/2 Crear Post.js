describe('Pruebas escenario crear post', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba crear un post estado Draf', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        createPost(cy, '¿Qué es Lorem Ipsum?', 'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.')
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.wait(1000)
        evalPostTitle(cy, '¿Qué es Lorem Ipsum?')
        cy.get('span.gh-content-status-draft.gh-badge.gh-badge-purple.nowrap').then(($postEstado) => {
            return $postEstado[0].outerText
        }).should('eq', 'DRAFT')
    })

    it('Prueba crear un post estado Published', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        createPost(cy, '¿Por qué lo usamos?', 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).')
        publishPost(cy)
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('span.flex.items-center.svg-midgray').click()
        evalPostTitle(cy, '¿Por qué lo usamos?')
        cy.get('span.gh-content-status-published.nowrap').then(($postEstado) => {
            return $postEstado[0].outerText
        }).should('eq', 'PUBLISHED')
    })
    
    function evalPostTitle(cy, title){
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', title)
    }

    function createPost(cy, title, body) {
        cy.get('#ember28').click()
        cy.wait(1000)
        cy.get('a.ember-view.gh-btn.gh-btn-green').click()
        cy.get('textarea.gh-editor-title').type(title)
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').type(body)
        cy.wait(1000)
    }

    function publishPost(cy){
        cy.get('div.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-outline.gh-publishmenu-trigger').click()
        cy.get('button.gh-btn.gh-btn-blue.gh-publishmenu-button.gh-btn-icon.ember-view').click()
        cy.wait(4000)
    }

    function loginUser(cy, email, password) {
      cy.get('#ember8').type(email)
      cy.get('#ember10').type(password)
      cy.get('#ember12').click()
      cy.wait(1000)
    }
  })