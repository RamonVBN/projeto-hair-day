import { fakeDatabase } from "../main.js";
import { apiConfig } from "./api-config.js";

export async function scheduleCancel({id}){
    if(!process.env.SHOULD_MAKE_API_CALL){
        const indexToRemove = fakeDatabase.findIndex((value)=> value.id===id)
        fakeDatabase.splice(indexToRemove, 1)
        alert('Agendamento cancelado com sucesso!')
        return
    }

    try {
        await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: 'DELETE'
        })
        alert('Agendamento cancelado com sucesso!')
        
    } catch (error) {
        console.log(error)
        alert('Não foi possível cancelar o agendamento.')
    }
}