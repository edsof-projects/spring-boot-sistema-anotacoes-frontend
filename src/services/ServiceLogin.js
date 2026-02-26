import { publicApi, privateApi } from "./api";

// Login usa a instância pública
export const login = async (email, senha) => {
  try {
    const response = await publicApi.post("/auth/login", {
      email,
      senha,
    });

    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("role",  data.role);
    localStorage.setItem("photo", data.photo);
    localStorage.setItem("id",    data.id);

    return data;
    
  } catch (error) {
    if (error.response) {
      console.error("Erro:", error.response.status, error.response.data);
    } else {
      console.error("Erro de rede:", error.message);
    }
    throw error;
  }
};

// Exemplo de rota protegida
export const getProtectedData = async () => {
  return await privateApi.get("/protected");
};