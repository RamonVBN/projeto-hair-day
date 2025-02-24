import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day";
import { hoursLoad } from "../form/hours-load";
import { schedulesShow } from "./show";

const selectedDate = document.getElementById('date')

export  async function schedulesDay(){
    //Obtém a data do input.
    const date = selectedDate.value
    
    
    // Busca na API os agendamentos para carregar do lado direito da tela.
    const dailySchedules = await scheduleFetchByDay({date})
    
    // Exibe os agendamentos.
    schedulesShow({dailySchedules})
    
    
    // Os horários disponíveis do lado esquerdo.
    
    // Renderiza as horas disponíveis.
    hoursLoad({date, dailySchedules})
}