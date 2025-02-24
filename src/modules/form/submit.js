import dayjs from 'dayjs'

import {scheduleNew} from "../../services/schedule-new.js"

import { schedulesDay } from '../schedules/load.js'


const selectedDate = document.getElementById('date')

const clientName = document.getElementById('client')

const form = document.querySelector('form')

// Data atual para o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual.
selectedDate.value = inputToday

// Define a data mínima como a atual.
selectedDate.min = inputToday

form.onsubmit =  async (event) => {
    event.preventDefault()
    
    try {
        // Recuperando o nome do cliente.
        const name = clientName.value.trim()

        if (!name) {
            return alert('Informe o nome do cliente!')
            
        }

        // Recupera o horário selecionado.
        const hourSelected = document.querySelector('.hour-selected')

        if (!hourSelected) {
            return alert('Selecione o horário do agendamento!')
            
        }

        // Recuperar somente a hora.

        const [hour,] = hourSelected.innerText.split(':')

        // Insere a hora na data.

        const when = dayjs(selectedDate.value).add(hour, 'hour')

        // Gerar um ID
        const id = new Date().getTime().toString()

        // Faz o agendamento.
        await scheduleNew({id, name, when})

        // Recarrega os agendamentos.
        await schedulesDay()

        // Limpa o nome do cliente.
        clientName.value = ''
    } catch (error) {
        alert('Não foi possível realizar o agendamento.')
    }
}