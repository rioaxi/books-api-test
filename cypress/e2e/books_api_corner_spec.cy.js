describe('Books Collection API - Corner Tests', () => {
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

    it('should return 400 when adding a book with an oversized title', () => {
        const oversizedTitle = 'A'.repeat(999);  // Title exceeds typical length constraints

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: oversizedTitle,
                author: 'Some Author',
                year: 2024
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('title', 'Title is required and should be a string with a maximum length of 255 characters.');
        });
    });

    it('should return 400 when adding a book with an oversized author name', () => {
        const oversizedAuthor = 'B'.repeat(999);  // Author name exceeds typical length constraints

        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'Some Title',
                author: oversizedAuthor,
                year: 2024
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('author', 'Author is required and should be a string with a maximum length of 255 characters.')
        });
    });

    it('should return 400 when adding a book with a negative year', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'Some Title',
                author: 'Some Author',
                year: -2024  
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('year', 'Year is required and should be a valid number between 0 and the current year.');
        });
    });

    it('should return 400 when adding a book with an extremely large year', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'Some Title',
                author: 'Some Author',
                year: 999999  
            },
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('year', 'Year is required and should be a valid number between 0 and the current year.');
        });
    });

    it('should return 400 when adding a book with an empty JSON object', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {},  
            failOnStatusCode: false  
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property('errors');
            expect(response.body.errors).to.have.property('title', 'Title is required and should be a string with a maximum length of 255 characters.');
            expect(response.body.errors).to.have.property('author', 'Author is required and should be a string with a maximum length of 255 characters.');
            expect(response.body.errors).to.have.property('year', 'Year is required and should be a valid number between 0 and the current year.');
        });
    });

    it('should return 400 when updating a book with invalid fields', () => {
        const bookId = 1;  // Adjust according to your mock data

        cy.request({
            method: 'PUT',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'Some Title',
                author: 'Some Author',
                year: 'invalidYear'  
            },
            failOnStatusCode: false 
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.errors).to.have.property('year', 'Year should be a valid number between 0 and the current year.');
        });
    });

});
