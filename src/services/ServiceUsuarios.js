import axios from "axios"

const RES_API_BASE_URL = "http://localhost:8081/usuario"

export const getAllUsuarios = ()             => axios.get(RES_API_BASE_URL)
export const getUsuarioById = (id)           => axios.get(`${RES_API_BASE_URL}/${id}`)
export const createUsuario  = (tipo)         => axios.post(RES_API_BASE_URL, tipo)
export const editUsuario    = (tipo, id)     => axios.put(`${RES_API_BASE_URL}/${id}`, tipo)
export const deleteUsuario  = (id)           => axios.delete(`${RES_API_BASE_URL}/${id}`)