import { NavLink, Outlet, useNavigate }  from "react-router-dom";
import { useState, useEffect }           from "react";
import FotoPadrao                        from "../../assets/default-photo.png";
import Logo                              from "/logo.png";
import { getUsuarioLogado }              from "../../services/ServiceUsuarios";
import "./Home.css";

const Home = () => {
  const [textoTitle, setTextoTitle]   = useState("Cadastrar Acesso");
  const [showLogo, setShowLogo]       = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navigate                      = useNavigate();
  const role                          = localStorage.getItem("role");
  const photo                         = localStorage.getItem("photo");  

  const API_URL                       = "http://localhost:8081"; // ajuste conforme seu backend
  
  const photoUrl                      = photo 
    ? `${API_URL}/uploads/usuarios/${photo}` 
    : FotoPadrao;

  const hiddenLogo    = () => setShowLogo(false); 

  useEffect(() => {
      const fetchNomeUsuario = async () => {
        try {
          const usuario = await getUsuarioLogado();
          setNomeUsuario(usuario.nome); // só o nome do usuário logado
        } catch (error) {
          console.error("Erro ao buscar usuário logado:", error);
        }
      };

      fetchNomeUsuario();
    }, []);

  const handleLogout  = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("photo");
    navigate("/"); 
  };

  const linksPermissions = (role) => {
    const linksHome = [
      { label: "Acessos",   path: "/home/acessos" },
      { label: "Usuários",  path: "/home/usuarios" },
      { label: "Anotações", path: "/home/anotacoes" },
      { label: "Tarefas",   path: "/home/tarefas" },
      { label: "Sair",      path: "logout" } 
    ];

    const linksUser = [
      { label: "Anotações", path: "/home/anotacoes" },
      { label: "Tarefas",   path: "/home/tarefas" },
      { label: "Sair",      path: "logout" }
    ];

    return role === "ROLE_ADMIN" ? linksHome : linksUser;
  };

  const links = linksPermissions(role);

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="areaFoto">
          <img src={photoUrl} alt="Foto do usuário" className="foto_user" />
          <span 
            className="text-center nomeUsuario">Bem, vindo<br/>
            {nomeUsuario
              ? nomeUsuario.length > 20
                ? nomeUsuario.slice(0, 20) + "..."
                : nomeUsuario
              : ""
            }
          </span>
        </div>

        <nav className="nav">
          <ul>
            {links.map((link) => (
              <li key={link.path}>
                {link.path === "logout" ? (
                  <NavLink
                    to="/"
                    className="nav-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    {link.label}
                  </NavLink>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                    onClick={hiddenLogo}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="content">
        <Outlet context={{ textoTitle, setTextoTitle }} />
        {showLogo && (
          <div className="d-flex flex-column areaImagem">
            <img src={Logo} alt="logo" className="logoAdmin" id="logo" />
            <h1 className="my-3 title">Área administrativa</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;