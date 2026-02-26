import { NavLink, useNavigate }   from "react-router-dom";
import { useState }               from "react";
import Foto                       from "/avatar-logo.png";
import { login }                  from "../../services/ServiceLogin";
import { jwtDecode }              from "jwt-decode"; 
import './Login.css';

const Login = () => {
  const navigate          = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
      console.error(error);
      alert("Erro no login: " + error.message);
    }
  };

  return (
    <main className="vw-100 vh-100 d-flex align-items-center ">
      <div className="content w-100 p-4 ">
        <form
          className="d-flex flex-column gap-4 p-4 mLargura w-100 bg-black rounded-2 mt-3" 
          onSubmit={handleLogin}
        >
          <img src={Foto} alt="foto padrão" width={150} />
          <h1 className="text-white fs-4 text-center">Bem-Vindo Faça o Login</h1>
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
          <div>
            <NavLink className="esqueciasenha">Esqueci a senha</NavLink>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;