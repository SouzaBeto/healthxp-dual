import users from '../fixtures/users.json'
// Importar o arquivo da fixture diretamente, sem precisar invocar uma função para isso
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('login', () => {

    // before(function (){                
    //     cy.fixture('users.json').then((user) =>{
    //     // cy.fixture('users.json').then((user) => {
    //     // Forma de usar arrow function
    //         this.user = user
    //     })
    // })

    it('deve logar com o perfil do admin', () => {

        const user = users.admin

        loginPage.doLogin(user)
        studentPage.navbar.userLoggedIn(user.name)

    })

    it('não deve logar com senha incorreta', () => {

        const user = users.inv_pass

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com email não cadastrado', () => {

        const user = users.email_not_found

        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com email com formato invalido', () => {

        const emails = users.inv_emails_format

        let outputMessage = []
        let expectedMessage = []

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()
            loginPage.popup.content()
                .invoke('text')
                .then((t) => {
                    cy.log(t)
                    outputMessage.push(t)
                    expectedMessage.push('Insira um email válido.')
                })
            // login.popUpHave('Insira um email válido.')
            loginPage.popup.back()
        })



    })

    it('não deve logar com email em branco', () => {

        const user = users.empty_email

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

    it('não deve logar com password em branco', () => {

        const user = users.empty_password

        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

})
