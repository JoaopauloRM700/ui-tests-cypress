
describe("Componentes visíveis da interface — Bemol", () => {
  beforeEach(() => {
    cy.visit("/");
  });

    it("Deve exibir o header visual com logo, busca e carrinho", () => {
        // Logo
        cy.get("img.vtex-store-components-3-x-logoImage")
        .should("be.visible");

        // Barra de busca
        cy.get('input[placeholder*="busque"]')
        .should("be.visible");

        // Carrinho
        cy.get('a[href*="cart"], a[href*="carrinho"]')
        .first()
        .should("be.visible");
    });

    // it("Deve permitir buscar por um produto", () => {
    //     // Campo de busca
    //     cy.get('input[placeholder*="busque"]')
    //         .should("be.visible")
    //         .type("tv{enter}");

    //     // Valida que a navegação ocorreu (padrão real da Bemol)
    //     cy.url().should("include", "_q=tv");

    //     // Valida que o termo buscado aparece na página
    //     cy.contains("tv", { matchCase: false })
    //         .should("exist");
    // });


    it("Deve permitir buscar por um produto (acionando Enter)", () => {
        cy.get('input[placeholder*="busque"]')
            .should("be.visible")
            .type("tv{enter}");

        cy.url().should("include", "_q=tv");
        cy.contains("tv", { matchCase: false })
            .should("exist");
    });

    it("Deve abrir o menu de categorias (desktop) e navegar por uma categoria", () => {
        // Garante layout desktop
        cy.viewport(1366, 768);
        cy.visit("/");

        // Abre o menu (ícone hambúrguer do desktop)
        cy.get('use[href="#hpa-hamburguer-menu"], use[xlink\\:href="#hpa-hamburguer-menu"]')
            .first()
            .then(($icon) => {
                const $trigger = $icon.closest('button, [role="button"], a');
                cy.wrap($trigger)
                    .should("have.length", 1)
                    .click({ force: true });
            });

        // Menu de categorias visível
        cy.get("ul.bemolqa-mega-menu-1-x-menuContainer")
            .should("be.visible");

        // Clica na primeira categoria (exclui link da home)
        cy.get("ul.bemolqa-mega-menu-1-x-menuContainer a.bemolqa-mega-menu-1-x-styledLink[href]")
            .not('[href="https://www.bemol.com.br//"]')
            .not('[href="https://www.bemol.com.br/"]')
            .first()
            .click();

        // Confirma que houve navegação para outra página
        cy.location("pathname")
            .should("not.eq", "/");
    });

    it("Deve abrir o menu hambúrguer (mobile) e exibir categorias", () => {
        cy.viewport(390, 844); // resolução típica de smartphone
        cy.visit("/");

        // Abre o menu hambúrguer
        cy.get('[class*="drawerTriggerContainer"] button, [class*="drawerTriggerContainer"]')
            .first()
            .click({ force: true });

        // Valida que o drawer abriu e contém links
        cy.get('div[class*="drawerContent"]')
            .filter(":visible")
            .first()
            .within(() => {
                cy.get("a[href]")
                    .its("length")
                    .should("be.greaterThan", 0);
            });
    });

    it("Deve exibir o footer com links visíveis", () => {
      cy.viewport(1366, 768);
      cy.visit("/");

      // Ancora no container do footer (mais estável do que procurar por texto)
      cy.get('div.vtex-flex-layout-0-x-flexRow--footerRow1')
        .should("exist")
        .scrollIntoView()
        .should("be.visible")
        .within(() => {
          // Garante que existe navegação no footer (links clicáveis)
          cy.get('a[href]')
            .filter(":visible")
            .its("length")
            .should("be.greaterThan", 0);
        });
    });

    afterEach(() => {
        // Limpa a aba para interromper scripts/requisições do site e reduzir consumo de memória
        cy.window().then((win) => {
        win.location.href = "about:blank";
        });
    
    });
});
