describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:5173');
    cy.get('[data-testid="add-button"]').click();
  })
})
