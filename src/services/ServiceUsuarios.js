import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/usuarios";

export const getAllUsuarios = () =>
  privateApi.get(RES_API_BASE_URL);

export const getUsuarioById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createUsuario = (user) =>
  privateApi.post(RES_API_BASE_URL, user);

export const deleteUsuario = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);

export const editUsuario = (user, id) => {
  return privateApi.put(`${RES_API_BASE_URL}/${id}`, user, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}