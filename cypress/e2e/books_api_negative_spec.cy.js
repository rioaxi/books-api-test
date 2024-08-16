describe('Books Collection API - Negative Tests', () => {
    let token;

    // Login
    it('should authenticate and return a JWT token', () => {
        cy.request('POST', '/login', {
            username: 'testuser',
            password: 'password'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            token = response.body.token; 
        });
    });

    // 1: Test getting a non-existent book by ID
    it('should return 404 when getting a non-existent book', () => {
        const nonExistentBookId = 9999;
        cy.request({
            method: 'GET',
            url: `/books/${nonExistentBookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'Book not found');
        });
    });

    // 2: Test deleting a non-existent book
    it('should return 404 when deleting a non-existent book', () => {
        const nonExistentBookId = 9999;
        cy.request({
            method: 'DELETE',
            url: `/books/${nonExistentBookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('error', 'Book not found');
        });
    });

    // 3: Test adding a book with missing fields
    it('should return 400 when adding a book with missing fields', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                // Missing 'title' and 'author'
                year: 2024
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('title', 'Title is required and should be a string with a maximum length of 255 characters.');
            expect(response.body.errors).to.have.property('author', 'Author is required and should be a string with a maximum length of 255 characters.');
        });
    });

    // 4: Test adding a book with invalid data
    it('should return 400 when adding a book with invalid data', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: '1984',
                author: '',
                year: 'invalid year' 
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('author', 'Author is required and should be a string with a maximum length of 255 characters.');
            expect(response.body.errors).to.have.property('year', 'Year is required and should be a valid number between 0 and the current year.');
        });
    });

    // 5: Test updating a book with invalid data
    it('should return 400 when updating a book with invalid data', () => {
        const bookId = 1;  
        cy.request({
            method: 'PUT',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: '',  
                author: 'New Author',
                year: 2025
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('year', 'Year should be a valid number between 0 and the current year.');
        });
    });

    // 6: Test timeout handler
    it('Should handle server timeout gracefully', () => {
        cy.request({
            method: 'GET',
            url: '/books/delayed', // Use the delayed route
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            timeout: 6000, // Setting a 6s timeout
            failOnStatusCode: false, 
        }).then((response) => {
            expect(response.status).to.eq(503);
            expect(response.body).to.have.property('error', 'Request timed out');
        });
    });
});
