import { useSearchParams, useNavigate } from "react-router-dom";
import { useState }                     from "react";
import Logo                             from "/avatar-logo.png";
import { toast }                        from 'react-toastify';
import './ResetarSenha.css';

const ResetarSenha = () => {
  const [searchParams]              = useSearchParams();
  const [novaSenha, setNovaSenha]   = useState("");
  const notify                      = (texto, tipo = "success") => toast.error(texto, {type : tipo , autoClose:4500});
  
  const navigate = useNavigate();
  const token    = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!novaSenha || novaSenha.trim() === "") {
        notify("Digite a nova senha para continuar", "error");
        return
    }
    const response = await fetch("http://localhost:8081/auth/resetar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token, novaSenha })
    });

    const data = await response.json();
    notify(data.message, "success");

    if (response.ok) {
      navigate("/");
    }
  };

  return (     

        <main className="login-container d-flex align-items-center justify-content-center">
            <div className="content p-4 ">
              <form
                  className="login-form d-flex flex-column gap-4 p-4 rounded-2 mt-3 "
                  onSubmit={handleSubmit}
              >
                  <img src={Logo} alt="foto padrão" className="logo" />
                  <h1 className="text-white fs-5">Redefinir Senha</h1>                 
                  <div className="form-floating w-100">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingInput"
                      placeholder="senha..."
                      name="senha"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Senha</label>
                  </div>
                  <button
                    className="btn btn-secondary px-3 py-2 fs-5 w-100"
                    type="submit"
                  >
                    Salvar
                  </button>                  
                  
              </form>
            </div>            
        </main>
  )
}

export default ResetarSenha;