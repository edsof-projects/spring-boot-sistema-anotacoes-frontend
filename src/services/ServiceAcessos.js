import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8090/nivelacesso"

export const getAllAcessos = () => axios.get(RES_API_BASE_URL)
export const getSaveAcesso = (tipo) => axios.post(RES_API_BASE_URL, tipo)