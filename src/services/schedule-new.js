import { fakeDatabase } from "../main.js";
import { apiConfig } from "./api-config.js";

export async function scheduleNew({id, name, when}) {
    if(!process.env.SHOULD_MAKE_API_CALL){
        fakeDatabase.push({id,name, when})
        alert('Agendamento realizado com sucesso!')
        return
    }

    try {
        // Fazendo a requisição.
        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, name, when})
        })

        alert('Agendamento realizado com sucesso!')
    } catch (error) {
        console.log(error)
        alert('Não foi possível agendar, tente novamente mais tarde.')
    }
}