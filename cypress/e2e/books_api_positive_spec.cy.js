describe('Books Collection API - Postive Tests', () => {
    let token;

    // 1: Test the login functionality
    before(() => {
        // Use the login function to authenticate and get the token
        cy.login().then(() => {
            // Retrieve the token from localStorage
            token = window.localStorage.getItem('jwtToken');
        });
    });

    // 2: Test getting all books and the data format
    it('Should successfully get all books with valid token and JSON response format', () => {
        cy.request({
            method: 'GET',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/json');
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    // 3: Test getting a single book by ID
    it('should GET a book by the given id', () => {
        const bookId = 1; 
        cy.request({
            method: 'GET',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', bookId);
        });
    });
    
    // 4: Test adding a new book
    it('should POST a new book', () => {
        cy.request({
            method: 'POST',
            url: '/books',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'New Book',
                author: 'New Author',
                year: 2024
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('title', 'New Book');
        });
    });

    // 5: Test updating a book
    it('should UPDATE a book by the given id', () => {
        const bookId = 31; 
        cy.request({
            method: 'PUT',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                title: 'Updated Book',
                author: 'Updated Author',
                year: 2024
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('title', 'Updated Book');
        });
    });

    // 6: Test deleting a book
    it('should DELETE a book by the given id', () => {
        const bookId = 31; 
        cy.request({
            method: 'DELETE',
            url: `/books/${bookId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Book deleted successfully');
        });
    });

});
