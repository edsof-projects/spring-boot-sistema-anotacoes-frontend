import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8081/anotacao"

export const getAllAnotacoes = ()             => axios.get(RES_API_BASE_URL)
export const getAnotacaoById = (id)           => axios.get(`${RES_API_BASE_URL}/${id}`)
export const createAnotacao  = (tipo)         => axios.post(RES_API_BASE_URL, tipo)
export const editAnotacao    = (tipo, id)     => axios.put(`${RES_API_BASE_URL}/${id}`, tipo)
export const deleteAnotacao  = (id)           => axios.delete(`${RES_API_BASE_URL}/${id}`)