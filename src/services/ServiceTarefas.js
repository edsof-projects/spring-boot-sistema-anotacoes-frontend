import axios from "axios"

const RES_API_BASE_URL     = "http://localhost:8081/tarefa"

export const getAllTarefas = ()             => axios.get(RES_API_BASE_URL)
export const getTarefaById = (id)           => axios.get(`${RES_API_BASE_URL}/${id}`)
export const createTarefa  = (tarefa)       => axios.post(RES_API_BASE_URL, tarefa)
export const editTarefa    = (tarefa, id)   => axios.put(`${RES_API_BASE_URL}/${id}`, tarefa)
export const deleteTarefa  = (id)           => axios.delete(`${RES_API_BASE_URL}/${id}`)
export const fecharTarefa  = (id)           => axios.put(`${RES_API_BASE_URL}/${id}/fechar`)