import navbar from './components/Navbar'
import popup from './components/Popup'

class StudentPage {

    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToRegister() {
        cy.get('a[href="/students/new"]').click()
        // se o hiperlink ref for curto, é melhor pois garante o destino

        // cy.contains('a', 'Cadastrar').click()
        // priorizar utilização do locator quando o link for grande demais
    }

    submitForm(student) {
        if (student.name) cy.get('input[name=name]').clear().type(student.name)
        if (student.email) cy.get('input[name=email]').clear().type(student.email)
        if (student.age) cy.get('input[name=age]').clear().type(student.age)
        if (student.weight) cy.get('input[name=weight]').clear().type(student.weight)
        if (student.feet_tall) cy.get('input[name=feet_tall]').clear().type(student.feet_tall)

        cy.contains('button', 'Cadastrar')
            .click()
    }

    search(name) {
        cy.get('input[placeholder="Buscar por nome"]')
            .type(name)
    }

    remove(email) {
        cy.contains('tr', email, { timeout: 10000 })
        .find('button')
        .click()
    }

    requiredMessage (label, text) {
        cy.contains('label', label)
        .parent()
        .find('span')
        .should('have.text', text)
    }
}

export default new StudentPage()