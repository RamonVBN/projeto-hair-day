import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { hoursClick } from "./hours-click.js"


const hours = document.getElementById('hours')

export function hoursLoad({date, dailySchedules}){
    // Limpa a lista de horários.
    hours.innerHTML = ""

    // Obbtém a lista de horários ocupados.
    const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format('HH:mm'))

    // Recupera somente a hora.
    const opening = openingHours.map((hour) => {


        const [scheduleHour,] = hour.split(':')
        

        // Adiciona a hora na date e verifica se está no passado.

        const isHourAfter = dayjs(date).add(scheduleHour, 'hour').isAfter(dayjs())

        const available =  !unavailableHours.includes(hour) && isHourAfter
        

        return {
            hour,
            available,
        }    
    })

    // Renderizar os horários.

    opening.forEach(({hour, available}) => {

        const li = document.createElement('li')
        li.classList.add('hour')
        li.classList.add(available? "hour-available": 'hour-unavailable')

        li.textContent = hour

        

        if (hour === '9:00') {
            hourHeaderAdd('Manhã')
        }else if (hour === '13:00') {
            hourHeaderAdd('Tarde')
            
        }else if (hour === '18:00') {
            hourHeaderAdd('Noite')

            
        }

        hours.append(li)
        

        


    })

    // Adiciona um evento de clique nos horários disponíveis
    hoursClick()

}

function hourHeaderAdd(title){
    const header = document.createElement('li')
    header.classList.add('hour-period')
    header.textContent = title

    hours.append(header)

}