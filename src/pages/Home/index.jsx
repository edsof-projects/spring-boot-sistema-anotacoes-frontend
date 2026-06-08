import { NavLink, Outlet, useLocation, Link }   from "react-router-dom";
import { useOutletContext, useNavigate }        from "react-router-dom";
import { useState, useEffect }                  from "react";
import { getUsuarioLogado }                     from "../../services/ServiceUsuarios";
import { editFotoUsuario }                      from "../../services/ServiceUsuarios";
import { getUser }                              from "../../utils/auth";
import MobileMenu                               from "../../components/MobileMenu";
import FotoPadrao                               from "../../assets/default-photo.png";
import ModalAlteraFoto                          from "../../components/Modals/ModalAlteraFoto";
import { useModalAlteraFoto }                   from "../../hooks/useModalAlteraFoto"
import ImagemLogo                               from "/logo.png";
import "./Home.css";

const Home = () => {
  const [textoTitle, setTextoTitle]   = useState("Cadastrar Acesso");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuOpen, setMenuOpen]       = useState(false);
  const location                      = useLocation();  
  const photo                         = localStorage.getItem("photo");  
  const id                            = localStorage.getItem("id"); 
  const API_URL                       = "http://localhost:8081";
  
  const {
    isOpen,
    abrirModal   : abrirModalOriginal,
    fecharModal  : fecharModalOriginal
  } = useModalAlteraFoto()
    
  const [photoUrl, setPhotoUrl]       = useState(
    photo ? `${API_URL}/uploads/usuarios/${photo}` : FotoPadrao
  );
  
  const navigate                      = useNavigate();
  const [file, setFile]               = useState(null);
  const [preview, setPreview]         = useState(photoUrl);
  const roleRaw                       = getUser()?.role || "";
  const role                          = roleRaw.startsWith("ROLE_") ? roleRaw : `ROLE_${roleRaw}`;
  const parentContext                 = useOutletContext() || {};

  function toggleMenu() {
    setMenuOpen(!menuOpen);   
  }  

  function abrirModal() {
    setFile(null);
    setPreview(photoUrl); // volta para a foto atual
    abrirModalOriginal();
    navigate("/"); 
  }

  function fecharModal() {
    setFile(null);
    setPreview(photoUrl); // reseta para foto atual
    fecharModalOriginal();
  }
  
function confirmUpdateFoto() {
  if (!file) {
    fecharModal();
    return;
  } 

  editFotoUsuario(id, file)
    .then((response) => {
      const novaFoto = response.data.foto; 
      localStorage.setItem("photo", novaFoto);
      const novaUrl = `${response.data.foto}?t=${Date.now()}`;
      setPhotoUrl(novaUrl);
      setPreview(novaUrl);
      fecharModal();
    })
    .catch(() => {
      fecharModal();
    });
}
 
  useEffect(() => {
    const fetchNomeUsuario = async () => {
      try {
        const usuario = await getUsuarioLogado();
        setNomeUsuario(usuario.nome);
      } catch (error) {
        console.error("Erro ao buscar usuário logado:", error);
      }
    };
    fetchNomeUsuario();
  }, []);   
 
  const handleLogout = () => {
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

  // ⭐ Verifica se está na rota raiz "/home"
  const isHomeRoot = location.pathname === "/home";
  
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="areaFoto">

          <Link to="/home">
            <img src={photoUrl} alt="Foto do usuário" className="foto_user" onClick= {abrirModal} />
          </Link>
          
          <span className="text-center nomeUsuario">
            Bem-vindo<br/>
            {nomeUsuario
              ? nomeUsuario.length > 20
                ? nomeUsuario.slice(0, 20) + "..."
                : nomeUsuario
              : ""
            }           
          </span>
          <span className="small">
            {roleRaw === "ROLE_ADMIN" ? "Administrador" : "Usuário"}
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
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="contentAdmin">
        {isHomeRoot ? (
          <div className="area_logoHome">
            <img src={ImagemLogo} alt="logo" className="logoHome"/>
            <h2 className="title-home fs-4">EDSOF INFORMÁTICA</h2>
          </div>
        ) : (
          <Outlet
            context={{
              ...parentContext,
              textoTitle,
              setTextoTitle,
              onMenuClick: toggleMenu
            }}
          />
        )}
      </main>
      
      <MobileMenu 
        open={menuOpen} 
        onClose={() => setMenuOpen(false)} 
      />

      {/* MODAL ALTERAR FOTO */}
      <ModalAlteraFoto
        isOpen={isOpen}
        mensagem="Escolha a nova foto!" 
        id={id}
        onConfirmar={confirmUpdateFoto}
        onCancelar={fecharModal}
        setFoto={setFile}
        setPreview={setPreview}
        preview={preview || photoUrl}
      />

    </div>
  )
}

export default Home;
