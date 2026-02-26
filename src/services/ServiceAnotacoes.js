import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/anotacoes";

export const getAllAnotacoes = () =>
  privateApi.get(RES_API_BASE_URL);

export const getAnotacaoById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createAnotacao = (tipo) =>
  privateApi.post(RES_API_BASE_URL, tipo);

export const deleteAnotacao = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);

export const editAnotacao = (formData, id) => {
  return axios.put(`${RES_API_BASE_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}