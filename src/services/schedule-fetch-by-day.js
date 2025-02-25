import { apiConfig } from "./api-config"

import dayjs from 'dayjs'

import {fakeDatabase} from "../main"


function getSchedulesFromToday(schedules, today)  {
    return schedules.filter((schedule) => dayjs(today).isSame(schedule.when, 'day'))
}

export async function scheduleFetchByDay({date}){
    if(!process.env.SHOULD_MAKE_API_REQUEST){
        return getSchedulesFromToday(fakeDatabase, date)
    }
    try {
        // Fazendo a requisição.
        const response = await fetch(`${apiConfig.baseURL}/schedules`)

        // Converte para JSON.
        const data = await response.json()

        // Filtra os agendamentos pelo dia selecionado.
        const dailySchedules = getSchedulesFromToday(data, date)

        return dailySchedules
    } catch (error) {
        console.log(error)
        alert('Não foi possível buscar o agendamento do dia selecionado.')
    }
}