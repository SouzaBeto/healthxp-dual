import navbar from './components/Navbar'
import popup from './components/Popup'

class EnrollsPage {
    constructor() {
        this.navbar = navbar
        this.popup = popup
    }

    goToForm() {
        cy.get('a[href="/enrollments/new"]')
            .click()
    }

    selectItem(item, value) {
        cy.get(`.select_${item}`)
            .click()

        cy.get(`input[aria-label="select_${item}"]`)
            .type(value)

        cy.contains('div[id*=option]', value)
            .click()
    }

    fillCard(data) {
        cy.get('#card_number').type(data.card.number)
        cy.get('#card_holder').type(data.student.name)
        cy.get('#card_month').type(data.card.month)
        cy.get('#card_year').type(data.card.year)
        cy.get('#card_cvv').type(data.card.cvv)
    }

    submit() {
        cy.contains('button', 'Cadastrar')
            .click()
    }
}

export default new EnrollsPage()