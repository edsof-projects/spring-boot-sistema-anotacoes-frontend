import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetarSenha = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8081/auth/resetar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, novaSenha })
    });

    const data = await response.json();
    alert(data.message);

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Redefinir Senha</h2>
      <input
        type="password"
        placeholder="Nova senha"
        value={novaSenha}
        onChange={(e) => setNovaSenha(e.target.value)}
      />
      <button type="submit">Salvar</button>
    </form>
  );
};

export default ResetarSenha;