import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/anotacoes";

export const getAllAnotacoes = () =>
  privateApi.get(RES_API_BASE_URL);

export const getAnotacaoById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createAnotacao = (anotacao) =>
  privateApi.post(RES_API_BASE_URL, anotacao);

export const deleteAnotacao = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);

export const editAnotacao = (anotacao, id) => {
  return privateApi.put(`${RES_API_BASE_URL}/${id}`, anotacao, {    
  });
}