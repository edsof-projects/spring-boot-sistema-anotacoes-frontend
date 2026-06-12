import { useNavigate }     from "react-router-dom";
import { useState }        from "react";
import { login }           from "../../services/ServiceLogin";
import { toast }           from 'react-toastify';
import { enviarEmail }     from "../../services/ServiceEnviarEmail";
import './Login.css';

const Login = () => {
  const navigate          = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const notify            = (texto, tipo = "success") => toast.error(texto, {type : tipo , autoClose:4500});

  const handleEnviarEmailParaAlteracao = async () => {
    if (!email) {
      notify("Digite seu e-mail para continuar.", "error");
      return;
    }

    let toastId;

    try {

      // Mostra o toast de loading persistente
      toastId = toast.loading("Processando...   Aguarde  a confirmação da solicitação.");

      await enviarEmail(email);

      // Atualiza o mesmo toast para sucesso
      toast.update(toastId, {
        render: "Enviamos um e-mail para conclusão de sua solicitação acesse sua caixa de entrada!",
        type: "success",
        isLoading: false,
        autoClose: 2500
      });

      setEmail("");

    } catch (error) {
      notify("Não foi possível enviar o e-mail de confirmação!", "error");
    }
  }

  const handleRegister = () => {
    navigate("/register")
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // login retorna { token, role, photo }
      const data = await login(email, senha);

      // separa o token puro
      const token = data.token.startsWith("Bearer ")
        ? data.token.split(" ")[1]
        : data.token;

      // salva no localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role",  data.role);
      localStorage.setItem("photo", data.photo);
      localStorage.setItem("id",    data.id);

      navigate("/home");

    } catch (error) {
      notify("Email ou senha inválidos. Tente novamente!", "error"); // mensagem amigável
      setEmail(""); 
      setSenha(""); 
    }
  }

  return (
    <main className="login-container d-flex align-items-center justify-content-center">
      <div className="conteudo p-4 w-100">
        <form
          className="login-form d-flex flex-column gap-4 p-4 rounded-2 mt-3 "
          onSubmit={handleLogin}
        >
          <img src="/avatar-logo.png" alt="foto padrão" className="imgLogin" />
          <h1 className="text-white fs-6">LOGIN</h1>
          <div className="form-floating w-100">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>
          <div className="form-floating w-100">
            <input
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="senha..."
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Senha</label>
          </div>

          <div className="area-btn w-100">          
            <button
              className="btn btn-secondary px-3 py-2 fs-5 w-100"
              type="submit"              
            >
              Entrar
            </button>
          </div>

          <div className="rodape">
            <div>
                <button
                  type="button"
                  className="txtesqueciasenha btn btn-link p-0"
                  onClick={handleRegister}
                >
                  Não tem cadastro?
                </button>
            </div>
            <div>
                <button
                  type="button"
                  className="txtesqueciasenha btn btn-link p-0"
                  onClick={handleEnviarEmailParaAlteracao}
                >
                  Esqueci a senha
                </button>
            </div>
          </div>
          
        </form>
      </div>
    </main>
  );
};

export default Login;