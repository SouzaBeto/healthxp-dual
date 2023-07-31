import data from '../fixtures/enrollments.json'
import enrollsPage from '../support/pages/EnrollsPage'

describe('matriculas', () => {

    it('deve poder matricular um novo aluno', () => {
        const dataTest = data.register

        cy.adminLogin()

        enrollsPage.navbar.goToEnrolls()
        enrollsPage.goToForm()

        enrollsPage.selectItem('student', dataTest.student.name)
        enrollsPage.selectItem('plan', dataTest.plan)
        enrollsPage.fillCard(dataTest)
        enrollsPage.submit()

    })
})