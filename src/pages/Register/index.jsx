import { useState }                                   from "react";
import { toast }                                      from 'react-toastify';
import { registerUsuario }                            from "../../services/ServiceUsuarios"
import { useNavigate }                                from "react-router-dom"
import { formatarNomeNormalizado, todasMinusculas }   from "../../utils/formatters"
import { enviarEmail }                                from "../../services/ServiceEnviarEmail";
import './Register.css';

const Register = () => {
  const [nome, setNome]      = useState("")
  const [email, setEmail]    = useState("")
  const navigate             = useNavigate()
  const notify               = (texto, tipo = "success") => toast.error(texto, {type : tipo , autoClose:4500});

  const voltarParaLogin = () => {
    navigate("/")
  }
 
  const handleRegister = async (e) => {
  e.preventDefault();

  if (!nome) {
    notify("Digite seu nome para continuar.", "error");
    return;
  }
  if (!email) {
    notify("Digite seu e-mail para continuar.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("usuario", new Blob([JSON.stringify({
    nome:  formatarNomeNormalizado(nome),
    email: todasMinusculas(email),
    senha: "eas1708",
    nivelAcessoId: 2
  })], { type: "application/json" }));

  let toastId;

    try {
      await registerUsuario(formData);

      // Mostra o toast de loading persistente
      toastId = toast.loading("Processando...Aguarde a confirmação do cadastro.");

      await enviarEmail(email);

      // Atualiza o mesmo toast para sucesso
      toast.update(toastId, {
        render: "Cadastro efetuado com sucesso! Verifique seu e-mail para maiores instruções!",
        type: "success",
        isLoading: false,
        autoClose: 2500
      });

      setNome("");
      setEmail("");
      setTimeout(voltarParaLogin, 2500);
    } catch (err) {
      // Atualiza o mesmo toast para erro
      if (toastId) {
        toast.update(toastId, {
          render: "Erro ao tentar cadastrar! Possível causa: duplicidade de cadastro!",
          type: "error",
          isLoading: false,
          autoClose: 2500
        });
      } else {
        toast.error("Erro ao tentar cadastrar! Possível causa: duplicidade de cadastro!");
      }
      setTimeout(voltarParaLogin, 2500);
    }
  };


  return (    
    <main className="login-container d-flex align-items-center justify-content-center">
      <div className="conteudo p-4 w-100">
        <form
          className="login-form d-flex flex-column gap-4 p-4 rounded-2 mt-3 "
          onSubmit={handleRegister}
        >
          <img src="/avatar-logo.png" alt="foto padrão" className="imgLogin" />
          <h1 className="text-white fs-6">CADASTRO</h1>
          <div className="form-floating w-100">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="nome..."
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            
            <label htmlFor="floatingInput">Nome</label>
          </div>
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

          <div className="area-btn w-100">          
            <button
              className="btn btn-secondary px-3 py-2 fs-5 w-100"
              type="submit"              
            >
              Enviar
            </button>
          </div>                    
        </form>
      </div>
    </main>
  );
};

export default Register;