import { useNavigate }     from "react-router-dom";
import { useState }        from "react";
import Logo                from "/avatar-logo.png";
import { login }           from "../../services/ServiceLogin";
import { recuperarSenha }  from "../../services/ServiceEmails"
import { jwtDecode }       from "jwt-decode";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleEmail = async () => {
    if (!email) {
      alert("Digite seu e-mail primeiro.");
      return;
    }

    try {
      const data = await recuperarSenha(email);
      alert(data.message);
      setEmail("")
    } catch (error) {
      console.error(error);
      alert(error.message);
      
    }
  };

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
      localStorage.setItem("role", data.role);
      localStorage.setItem("photo", data.photo);
      localStorage.setItem("id", data.id);

      // decodifica se precisar
      const decoded = jwtDecode(token);

      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Erro no login: " + error.message);
      setEmail("")
      setSenha("")
    }
  };

  return (
    <main className="login-container d-flex align-items-center justify-content-center">
      <div className="content p-4 w-100">
        <form
          className="login-form d-flex flex-column gap-4 p-4 rounded-2 mt-3 "
          onSubmit={handleLogin}
        >
          <img src={Logo} alt="foto padrão" className="logo" />
          <h1 className="text-white fs-5">Login</h1>
          <div className="form-floating w-100">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <label htmlFor="floatingInput">Senha</label>
          </div>
          <button
            className="btn btn-secondary px-3 py-2 fs-5"
            type="submit"
          >
            Entrar
          </button>
          <div className="area-esqueci-senha">
              <button
                type="button"
                className="txtesqueciasenha btn btn-link p-0"
                onClick={handleEmail}
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