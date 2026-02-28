
export async function recuperarSenha(email) {

  const response = await fetch("http://localhost:8081/auth/recuperar-senha", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    throw new Error("Erro ao solicitar recuperação de senha!");
  }

  return response.json();
}