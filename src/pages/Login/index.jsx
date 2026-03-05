import { useNavigate }     from "react-router-dom";
import { useState }        from "react";
import imgLogin            from "/avatar-logo.png";
import { login }           from "../../services/ServiceLogin";
import { recuperarSenha }  from "../../services/ServiceRecuperarSenha"
import { jwtDecode }       from "jwt-decode";
import { toast }           from 'react-toastify';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const notify            = (texto, tipo = "success") => toast.error(texto, {type : tipo , autoClose:4500});

  const handleVerificarEmail = async () => {
    //verifica se o email foi digitado para recuperacao de senha
    if (!email) {
      notify("Digite seu e-mail para continuar.", "error");
      return;
    }

    try {
      await recuperarSenha(email);
      notify("Acesse a caixa de entrada do e-mail digitado para maiores instruções!", "success");
      setEmail("");
    } catch (error) {
      // mesmo em caso de erro, mostra a mesma mensagem
      notify("Acesse a caixa de entrada do e-mail digitado para maiores instruções!", "success");
    }
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

      // decodifica se precisar
      const decoded = jwtDecode(token);

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
        <img src={imgLogin} alt="foto padrão" className="imgLogin" />
          <h1 className="text-white fs-6">Login</h1>
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

          <div className="area-esqueci-senha">
              <button
                type="button"
                className="txtesqueciasenha btn btn-link p-0"
                onClick={handleVerificarEmail}
              >
                Esqueci a senha
              </button>
          </div>
          
        </form>
      </div>
    </main>
  );
};

export default Login;