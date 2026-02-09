
describe("Capítulo 10 — Fluxo E2E: Busca", () => {
  const SEARCH_INPUT = 'input[type="text"][placeholder="busque aqui seu produto"]';
  const PRODUCT_CARD = "section.vtex-product-summary-2-x-container";
  const PRODUCT_LINK = 'section.vtex-product-summary-2-x-container a[href$="/p"]';

    
  beforeEach(() => {
    cy.visit("/");
  });


  it("Busca com resultado: deve navegar e listar produtos", () => {
    cy.viewport(1366, 768);
    cy.visit("/");

    cy.get(SEARCH_INPUT)
      .should("be.visible")
      .click()
      .type("tv{enter}");

    // resultado esperado: saiu da home
    cy.location("pathname").should("not.eq", "/");

    // resultado esperado: há produtos visíveis
    cy.get(PRODUCT_CARD)
      .filter(":visible")
      .its("length")
      .should("be.greaterThan", 0);

    // evidência extra: ao menos 1 link para PDP
    cy.get(PRODUCT_LINK)
      .filter(":visible")
      .its("length")
      .should("be.greaterThan", 0);
  });

  it("Busca sem resultado: deve exibir estado vazio (ou 0 produtos)", () => {
    cy.viewport(1366, 768);
    cy.visit("/");

    cy.get(SEARCH_INPUT)
      .should("be.visible")
      .click()
      .type("602612**7{enter}");

    cy.location("pathname").should("not.eq", "/");
    cy.url().should("include", "_q=602612**7");
    cy.contains("Desculpe, não encontramos o que você procurava.", { timeout: 10000 })
      .should("be.visible");

    // critério genérico: nenhum card visível (lida com "não existe" também)
    cy.get("body").then(($body) => {
      const visibleCards = $body.find(PRODUCT_CARD).filter(":visible");
      expect(visibleCards.length).to.eq(0);
    });
  });

  afterEach(() => {
        // Limpa a aba para interromper scripts/requisições do site e reduzir consumo de memória
        cy.window().then((win) => {
        win.location.href = "about:blank";
        });
    
    });
});
