import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/tarefas";

export const getAllTarefas = () =>
  privateApi.get(RES_API_BASE_URL);

export const getTarefaById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createTarefa = (tipo) =>
  privateApi.post(RES_API_BASE_URL, tipo);

export const deleteTarefa = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);

export const fecharTarefa = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}/fechar`);

export const editTarefa = (formData, id) => {
  return axios.put(`${RES_API_BASE_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}