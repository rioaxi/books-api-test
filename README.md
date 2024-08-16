# books-api-test

## Prerequisites
This project requires [mock-api-books](https://github.com/rioaxi/mock-api-books/tree/main).

## Quick start
1. Make sure the API service is running on http://localhost:3000
2. `npx cypress run` to run all the test cases. Or
`npx cypress run --spec "cypress/e2e/books_api_positive_spec.cy.js"` to run only test cases in postive testing

## Directory Structure
```bash
cypress/
├── e2e/
│   ├── books_api_auth_spec.cy.js
│   ├── books_api_corner_spec.cy.js
│   ├── books_api_negative_spec.cy.js
│   ├── books_api_perf_spec.cy.js
│   ├── books_api_positive_spec.cy.js
│   └──  books_api_security_spec.cy.js
```

## Report 
Reports are in the folder ['result'](https://github.com/rioaxi/books-api-test/tree/main/results/mocha)

## Test Cases

### Positive Cases Testing 
1. Verify user with correct username and password can login sucessfully, and should return code 200. -- PASS
2. Verify getting all books should return all books in JSON format and code 200. -- PASS
3. Verify getting a single book by ID should return the correct book and code 200.  -- PASS
4. Verify adding a new book should return the added book info and code 200. -- PASS
5. Verify updating a book should return the updated book info and code 200. -- PASS
6. Verify deleting a book should return code 200 and clear message. -- PASS

### Authentication Failed Cases Testing
1. Verify accessing the API without a token should return code 401 and clear error message. -- PASS
2. Verify accessing the API with an expired token should return code 403 and clear error message. -- PASS
3. Verify accessing the API with a malformed token should return code 403 and clear error message. -- PASS 

### Corner Cases Testing 
1. Verify adding a book with an oversized title should return code 400 and clear error message. -- PASS
2. Verify adding a book with an oversized author name should return code 400 and clear error message. -- PASS
3. Verify adding a book with a negative year should return code 400 and clear error message. -- PASS
4. Verify adding a book with an extremely large year should return code 400 and clear error message. -- PASS
5. Verify adding a book with an empty JSON object should return code 400 and clear error message. -- PASS
6. Verify updating a book with invalid fields should return code 400 and clear error message. -- PASS

### Negative Cases Testing
1. Verify getting a non-existent book should return code 404 and clear error message. -- PASS
2. Verify deleting a non-existent book should return code 404 and clear error message. -- PASS
3. Verify adding a book with missing fields should return code 400 and clear error message. -- PASS
4. Verify adding a book with invalid data should return code 400 and clear error message. -- PASS
5. Verify updating a book with invalid data should return code 400 and clear error message. -- PASS
6. Verify request timeout should return code 503 and clear error message. --FAIL

### Performance Testing
1. Verify API server should respond within 200ms when adding a book. -- PASS
2. Verify API servershould respond within 200ms when retrieving a book. -- PASS

### Security Testing -- FAIL (code not handle)
1. Verify should not be vulnerable to SQL Injection when adding a book.
2. Verify should not be vulnerable to SQL Injection when updating a book.
3. Verify should not be vulnerable to XSS when adding a book.
4. Verify should not be vulnerable to XSS when updating a book.

### Test cases could be added in the future
1. 	Authorization testing
2.	Token Security
3.	Session Management
4.	Authentication Bypass
5.	Security Headers
6.	Rate Limiting
7.	Sensitive Data Exposure
8.	HTTPS/TLS Testing
9.	Stress Testing
10.	API Key Security
11.	Rate Limiting Assessment
12.	Concurrency Testing without Data Corruption
13.	Resource Utilization Testing
14.	Database Load Testing




