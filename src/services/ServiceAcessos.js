import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8080/nivelacesso"

export const getAllAcessos = () => axios.get(RES_API_BASE_URL)