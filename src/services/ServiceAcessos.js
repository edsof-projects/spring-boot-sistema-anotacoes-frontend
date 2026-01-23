import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8081/nivelacesso"

export const getAllAcessos = ()             => axios.get(RES_API_BASE_URL)
export const getTipoById   = (id)           => axios.get(`${RES_API_BASE_URL}/${id}`)
export const createAcesso  = (tipo)         => axios.post(RES_API_BASE_URL, tipo)
export const editAcesso    = (tipo, id)     => axios.put(`${RES_API_BASE_URL}/${id}`, tipo)
export const deleteAcesso  = (id)           => axios.delete(`${RES_API_BASE_URL}/${id}`)