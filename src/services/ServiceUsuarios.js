import { privateApi } from "./api"; 

const BASE_URL = "/usuarios";

export const getAllUsuarios = () =>
  privateApi.get(BASE_URL);

export const getUsuarioById = (id) =>
  privateApi.get(`${BASE_URL}/${id}`);

export const getUrlFotoById = (id) =>
  privateApi.get(`/usuarios/${id}/foto`);

export const createUsuario = (user) =>
  privateApi.post(BASE_URL, user);

export const deleteUsuario = (id) =>
  privateApi.delete(`${BASE_URL}/${id}`);

export const getUsuarioLogado = async () => {
  const response = await privateApi.get(`${BASE_URL}/me`);
  return response.data; 
}

export const editUsuario = (user, id) => {
  return privateApi.put(`${BASE_URL}/${id}`, user, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}

export const editFotoUsuario = (id, file) => {
  const formData = new FormData();
  formData.append("foto", file); // "foto" deve bater com o nome do @RequestPart no backend

  return privateApi.patch(`${BASE_URL}/${id}/foto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};


export const registerUsuario = (user) => {
  return privateApi.post(`${BASE_URL}/register`, user);
};



