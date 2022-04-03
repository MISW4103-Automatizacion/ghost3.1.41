describe('Pruebas escenario modificar post', () => {
    beforeEach(()=>{
        cy.clearCookies()
        cy.visit('http://localhost:2368/ghost/')
        cy.wait(7000)
        loginUser(cy, 'mc.gomezt1@uniandes.edu.co', 'Tagamandapio123@')
    })

    it('Prueba modificar un post estado Draf', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('#ember28').click()
        cy.wait(1000)
        cy.get('span.flex.items-center.svg-midgrey').then(($menuPost) => {
            return $menuPost[0]
        }).click()
        editPost(cy, '¿De dónde viene?', 'Al contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, "consecteur", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de "de Finnibus Bonorum et Malorum" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, "Lorem ipsum dolor sit amet..", viene de una linea en la sección 1.10.32')
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.wait(1000)
        evalPostTitle(cy, '¿De dónde viene?')
        cy.get('span.gh-content-status-draft.gh-badge.gh-badge-purple.nowrap').then(($postEstado) => {
            return $postEstado[0].outerText
        }).should('eq', 'DRAFT')
    })
    
    it('Prueba modificar un post estado Published', () => {
        cy.title().should('eq', 'Site - Mi primer blog')
        cy.get('#ember28').click()
        cy.wait(1000)
        cy.get('span.flex.items-center.svg-midgray').then(($menuPost) => {
            return $menuPost[0]
        }).click()
        editPost(cy, '¿Dónde puedo conseguirlo?', 'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.')
        publishPost(cy)
        cy.get('a.blue.link.fw4.flex.items-center.ember-view').click()
        cy.get('span.flex.items-center.svg-midgray').click()
        evalPostTitle(cy, '¿Dónde puedo conseguirlo?')
        cy.get('span.gh-content-status-published.nowrap').then(($postEstado) => {
            return $postEstado[0].outerText
        }).should('eq', 'PUBLISHED')
    })
    
    function evalPostTitle(cy, title){
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0].getElementsByTagName('h3')[0].outerText
        }).should('eq', title)
    }

    function editPost(cy, title, body) {
        cy.get('a.ember-view.permalink.gh-list-data.gh-post-list-title').then(($postTitle) => {
            return $postTitle[0]
        }).click()
        cy.get('textarea.gh-editor-title').clear()
        cy.get('textarea.gh-editor-title').type(title)
        cy.get('div.koenig-editor__editor.__mobiledoc-editor').clear()
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