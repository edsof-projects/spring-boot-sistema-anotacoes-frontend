import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/tarefas";

export const getAllTarefas = () =>
  privateApi.get(RES_API_BASE_URL);

export const getTarefaById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createTarefa = (tarefa) =>
  privateApi.post(RES_API_BASE_URL, tarefa);

export const deleteTarefa = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);

export const fecharTarefa = (id) =>
  privateApi.put(`${RES_API_BASE_URL}/${id}/fechar`);

export const editTarefa = (tarefa, id) => {
  return privateApi.put(`${RES_API_BASE_URL}/${id}`, tarefa, {    
  });
}
