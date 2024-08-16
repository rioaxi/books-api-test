describe('Books Collection API - Authentication Tests', () => {

    const sampleBook = {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        year: 1925
    };

    it('should return 401 when accessing the API without a token', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            body: sampleBook,
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('error', 'Unauthorized: No token provided');
        });
    });

    it('should return 403 when accessing the API with an expired token', () => {
        const expiredToken = 'expiredToken12345';

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${expiredToken}`
            },
            body: sampleBook,
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.have.property('error', 'Forbidden: Invalid token');
        });
    });

    it('should return 403 when accessing the API with a malformed token', () => {
        const malformedToken = 'malformedToken12345';

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${malformedToken}`
            },
            body: sampleBook,
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(403);
            expect(response.body).to.have.property('error', 'Forbidden: Invalid token');
        });
    });
});
