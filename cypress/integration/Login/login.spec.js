context('Login', () => {
    beforeEach(() => {
        // Intercept Auto Login
        cy.intercept({method: 'POST', url: '/api/auth/getJwtInfo',}, {statusCode: 500});
        cy.intercept({method: 'GET', url: '/api/auth/getUserInfo',}, {statusCode: 500});


        cy.fixture('Login/userinfo.json').as('userinfo')
        cy.get('@userinfo').then(userinfo => {
            cy.intercept({method: 'GET', url: '/api/auth/getUserInfo',}, {statusCode: 200, body: userinfo});
        });

        cy.visit('http://localhost:3000')
    });

    describe('Login', () => {
        it('Logins when incorrect credentials is inputted', () => {
            // Define Fixtures
            cy.fixture('Login/invalid-email-pass.json').as('invalid-email-pass')

            //Fill Up username and password and click submit button
            cy.get('[data-cy="email"]').type('ceo@test.com')
            cy.get('[data-cy="password"]').type('password')
            cy.get('@invalid-email-pass').then(invalidEmailPassFixture => {
                cy.intercept({method: 'POST', url: '/api/auth/signin',}
                    , {
                        statusCode: 500,
                        body: invalidEmailPassFixture
                    });
            });

            cy.get('[data-cy="login-button"]').click()

            //Assertions
            cy.get('[data-cy="login-error"]')
                .should('have.text', "Invalid email or password!");

        });

        it('Logins when correct credentials is inputted', () => {
            // Define Fixtures
            cy.fixture('Login/signin.json').as('signin')

            //Fill Up username and password and click submit button
            cy.get('[data-cy="email"]').type('ceo@test.com')
            cy.get('[data-cy="password"]').type('password')

            cy.get('@signin').then(signin => {
                cy.intercept({method: 'POST', url: '/api/auth/signin',}
                    , {
                        statusCode: 200,
                        body: signin
                    });
            });

            cy.get('[data-cy="login-button"]').click()

            // Intercept Request After Successful Login
            cy.get('@signin').then(signin => {
                cy.intercept({method: 'POST', url: '/api/auth/getJwtInfo',}, {statusCode: 200, body: signin});
            });

        });

    });
});