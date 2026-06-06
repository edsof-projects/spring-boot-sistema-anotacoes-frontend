export async function confirmarCadastro(token, novaSenha) {
  const response = await fetch("http://localhost:8081/auth/confirmar-cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, novaSenha })
  });

  if (!response.ok) {
    throw new Error("Erro ao confirmar cadastro!");
  }
  return response.json();
}
