describe('Books Collection API - Performance Tests', () => {
    let token;

    before(() => {
        cy.request('POST', '/login', {
            username: 'testuser',
            password: 'password'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            token = response.body.token;
        });
    });

    it('should respond within 200ms when adding a book', () => {
        const sampleBook = {
            title: 'Performance Testing Book',
            author: 'Test Author',
            year: 2024
        };

        const startTime = performance.now();

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: sampleBook,
            failOnStatusCode: false
        }).then((response) => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(response.status).to.eq(201);
            expect(duration).to.be.lessThan(200); 
        });
    });

    it('should respond within 200ms when retrieving a book', () => {
        const bookId = 1; 

        const startTime = performance.now();

        cy.request({
            method: 'GET',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false
        }).then((response) => {
            const endTime = performance.now();
            const duration = endTime - startTime;
            
            expect(response.status).to.eq(200);
            expect(duration).to.be.lessThan(200); 
        });
    });

});
