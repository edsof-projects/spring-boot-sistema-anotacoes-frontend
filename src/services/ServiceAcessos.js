import { privateApi } from "./api"; 

const RES_API_BASE_URL = "/nivelacessos";

export const getAllAcessos = () =>
  privateApi.get(RES_API_BASE_URL);

export const getTipoById = (id) =>
  privateApi.get(`${RES_API_BASE_URL}/${id}`);

export const createAcesso = (tipo) =>
  privateApi.post(RES_API_BASE_URL, tipo);

export const editAcesso = (tipo, id) =>
  privateApi.put(`${RES_API_BASE_URL}/${id}`, tipo);

export const deleteAcesso = (id) =>
  privateApi.delete(`${RES_API_BASE_URL}/${id}`);