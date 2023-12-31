import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage'

describe('alunos', () => {

    it('deve poder cadastrar um novo aluno', () => {

        const student = students.create

        cy.task('deleteStudent', student.email)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')

    })

    it('não deve cadastrar com email duplicado', () => {
        const student = students.duplicate

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matricula', () => {
        const student = students.remove

        cy.task('resetStudent', student)

        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)
        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it('todos os campos são obrigatórios', () => {
        const student = students.required

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Nome', 'Nome é obrigatório')
        studentPage.requiredMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredMessage('Altura', 'A altura é obrigatória')

    })

    it('não deve cadastrar usuário com menos de 16 anos', () => {
        const student = students.inv_age

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Idade', 'A idade mínima para treinar é 16 anos!')
    })

    it('não deve cadastrar com altura zerada ou negativa', () => {
        const student = students.inv_feet_tall

        cy.task('deleteStudent', student.email)

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Altura', 'A altura não pode ser menor ou igual a 0')
    })

    it('não deve cadastrar com peso zerado ou negativo', () => {
        const student = students.inv_weigth

        cy.task('deleteStudent', student.email)

        cy.adminLogin()
        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Peso', 'O peso não pode ser menor ou igual a 0')
    })

})