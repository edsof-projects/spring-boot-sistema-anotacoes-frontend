import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8090/nivelacesso"

export const getAllAcessos =     ()         => axios.get(RES_API_BASE_URL)
export const createAcesso  = (tipo)         => axios.post(RES_API_BASE_URL, tipo)
export const getTipoById   = (tipoId)       => axios.get(RES_API_BASE_URL + "/" + tipoId)
export const editAcesso    = (tipo, id)     => axios.put(`${RES_API_BASE_URL}/${id}`, tipo)