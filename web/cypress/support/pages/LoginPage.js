import popup from "./components/Popup"

class LoginPage {

    constructor() {
        this.popup = popup
    }

    go() {
        cy.visit('http://localhost:3000')
    }

    fill(user) {
        cy.get('input[name=email]').clear({force:true}).as('email')
        // originalmente, Papito usou #email e #password para detectar o campo pelo id.
        // a "#" busca diretamente o valor do id
        cy.get('input[name=password]').clear({force:true}).as('password')
        user.email ? cy.get('@email').type(user.email) : cy.log('empty email')
        user.password ? cy.get('@password').type(user.password) : cy.log('empty password')

        // if(user.email) {
        //     cy.get('@email')
        //         .type(user.email)
        // }
        // if (user.password) {
        //     cy.get('@password')
        //         .type(user.password)
        // }


    }

    submit() {
        cy.contains('button', 'Entrar').click()
    }

    doLogin(user) {
        this.go()
        this.fill(user)
        this.submit()
    }

}

export default new LoginPage()