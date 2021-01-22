/// <reference types="cypress" />

context('Homepage', () => {
    let url; 
    let intersectlink;

  beforeEach(() => {
    cy.fixture('commonTestData')
    .then((weblink) => {
      // "this" is still the test context object
      url = weblink.url
      intersectlink = weblink.intersect
      cy.visit(url)
    })
  }) // end of beforeeach()

it('cy.title() - should have title', () => {
    // https://www.hobsons.com
    cy.title().should('include', 'Education Advances | Hobsons')
  })

  it('cy.get() - should have logo', () => {
    // https://www.hobsons.com
    cy.get('.site-header__logo-link').find('img').should('have.attr', 'src').should('include','hobsons-logo.svg')
  })

  it('cy.get() - should have learn more', () => {
    // https://www.hobsons.com
    cy.get('.card-home-banner__title').contains('Intersect').trigger('mouseover')
    cy.get('#body > section > div > .banner-home__cards-container > a:nth-child(2) > .card-home-banner__lower > span').should('have.text','Learn More').click()
    cy.get('h1').contains('Intersect')
  }) 

  it('cy.get() - should have US map', () => {
    // https://www.hobsons.com/solution/intersect/
    cy.visit(intersectlink)
    cy.get('.block-stats-map__map').scrollIntoView()
    
    if (cy.get('option').contains('Nebraska, Missouri, Kansas, Iowa, & Oklahoma'))
      cy.log('United States Map')
    else
      cy.log('Not a United States Map')
  })

/* it('cy.get() - should have all tooltip', () => {
    // https://www.hobsons.com/solution/intersect/
    cy.visit(intersectlink)
    cy.get('.block-stats-map__map').scrollIntoView()

    cy.get('#body > main > section.hide-for-small-only.bg-gray.block-container.block-stats-map.block-index-8 > .block-stats-map__popup.active > div').trigger('mouseover').click()
    const txt = cy.get('.block-stats-map__popup-content-container').text();

    /*cy.get('svg').within(() => {
      cy.get('.block-stats-map__state-dropdown').each(($op, j, $stats) => {
        const optval = $op.find('data-popup-text').text();
        stats[j] = optval;                 
      cy.get('g').find('data-popup-content').each(($el, index, $list) => {
        const txt = $el.find('data-popup-content').text();
        list[index]=txt;
      if (optval [j] === list[index])
       {
          cy.log("Matched")
          j = j + 1;
          index = index + 1;
       }
      });    
    });
  });
 })*/
})