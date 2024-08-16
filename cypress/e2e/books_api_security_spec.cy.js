describe('Books API - Security Tests', () => {
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

    it('should not be vulnerable to SQL Injection when adding a book', () => {
        const sqlInjectionPayload = {
            title: "' OR '1'='1",
            author: "Test Author",
            year: 2024
        };

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: sqlInjectionPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);  // Expecting a validation error or failure
            expect(response.body.errors).to.have.property('title').and.to.match(/invalid/);  // Adjust as needed
        });
    });

    it('should not be vulnerable to SQL Injection when updating a book', () => {
        const bookId = 1; 
        const sqlInjectionPayload = {
            title: "' OR '1'='1",
            author: "Test Author",
            year: 2024
        };

        cy.request({
            method: 'PUT',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: sqlInjectionPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);  
            expect(response.body.errors).to.have.property('title').and.to.match(/invalid/);  
        });
    });
    it('should not be vulnerable to XSS when adding a book', () => {
        const xssPayload = {
            title: "<script>alert('XSS')</script>",
            author: "Test Author",
            year: 2024
        };

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: xssPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);  
            expect(response.body.errors).to.have.property('title').and.to.match(/invalid/);  
        });
    });

    it('should not be vulnerable to XSS when updating a book', () => {
        const bookId = 1; 
        const xssPayload = {
            title: "<script>alert('XSS')</script>",
            author: "Test Author",
            year: 2024
        };

        cy.request({
            method: 'PUT',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: xssPayload,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);  
            expect(response.body.errors).to.have.property('title').and.to.match(/invalid/);  
        });
    });
});
