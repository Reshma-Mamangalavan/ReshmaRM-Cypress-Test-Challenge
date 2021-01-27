/// <reference types="cypress" />

context('Homepage', () => {
  let url, intersectlink, title, logo, sitename, learning, mapval;
  
beforeEach(() => {
  cy.fixture('commonTestData')
  .then((weblink) => {
    // "this" is still the test context object
    url = weblink.url
    intersectlink = weblink.intersect
    title = weblink.title
    logo = weblink.logo
    learning = weblink.learnmore
    sitename = weblink.site
    mapval = weblink.usmapoptions
    cy.visit(url)
  })
}) // end of beforeeach()

it('cy.title() - should have title', () => {
  // https://www.hobsons.com
  cy.title().should('include', title)
})

it('cy.get() - should have logo', () => {
  // https://www.hobsons.com
  cy.get('.site-header__logo-link').find('img').should('have.attr', 'src').should('include', logo)
})

it('cy.get() - should have learn more', () => {
  // https://www.hobsons.com
  cy.get('.card-home-banner__title').contains('Intersect').trigger('mouseover')
  cy.get('#body > section > div > .banner-home__cards-container > a:nth-child(2) > .card-home-banner__lower > span').should('have.text', learning).click()
  cy.get('h1').contains(sitename)
}) 

it('cy.get() - should have US map', () => {
  // https://www.hobsons.com/solution/intersect/
  cy.visit(intersectlink)
  cy.get('.block-stats-map__map').scrollIntoView()
  
  if (cy.get('option').contains(mapval))
    cy.log('United States Map')
  else
    cy.log('Not a United States Map')
})

it('cy.get() - should have all tooltip', () => {
  // https://www.hobsons.com/solution/intersect/
  cy.visit(intersectlink)
  cy.get('.block-stats-map__map').scrollIntoView()

  let tooltiptext = ''
  cy.get('polygon')
      .eq(2).invoke('show')
      .trigger('mouseenter')
      .wait(1000)
      .then(incharge => {
         tooltiptext = incharge.text()
         cy.get('svg').within(() => {
          cy.get('g')
          .and (tooltip => {
            expect(tooltip.text() === tooltiptext)
          })
        })
   })
})
})