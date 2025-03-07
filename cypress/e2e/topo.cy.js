describe('When opening the app for the first time', () => {
  it('scans a QR and shows it on the list', () => {
    cy.visit('localhost:5173');
    cy.contains('Secret');
    cy.contains('Code');

    cy.get('[data-testid="scan-first-qr"').click();

    // Reads the fixture QR from `cypress/fixtures/topo-qr.mjpeg`
    const fixtureIssuer = 'TopoTestSecret';
    cy.contains(fixtureIssuer);
  })
})
