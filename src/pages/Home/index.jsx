// import { NavLink, Outlet }               from "react-router-dom";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import { useState, useEffect }           from "react";
// import FotoPadrao                        from "../../assets/default-photo.png";
// import { getUsuarioLogado }              from "../../services/ServiceUsuarios";
// import { getUser }                       from "../../utils/auth"
// import MobileMenu                        from "../../components/MobileMenu";
// import "./Home.css";

// const Home = () => {
//   const [textoTitle, setTextoTitle]     = useState("Cadastrar Acesso");
//   const [nomeUsuario, setNomeUsuario]   = useState("");
//   const [menuOpen, setMenuOpen]         = useState(false);
//   const navigate                        = useNavigate();
//   const photo                           = localStorage.getItem("photo");  

//   const API_URL                         = "http://localhost:8081"; // ajuste conforme seu backend
  
//   const photoUrl                        = photo 
//     ? `${API_URL}/uploads/usuarios/${photo}` 
//     : FotoPadrao;

//   const roleRaw = getUser()?.role || "";

//   // normaliza role vinda do backend
//   const role = roleRaw.startsWith("ROLE_")
//     ? roleRaw
//     : `ROLE_${roleRaw}`;

//   const parentContext  = useOutletContext() || {};
  
//   // função que abre/fecha menu
//   function toggleMenu() {
//     setMenuOpen(!menuOpen);   
//   }

//   const hiddenLogo    = () => setShowLogo(false); 

//   useEffect(() => {
//       const fetchNomeUsuario = async () => {
//         try {
//           const usuario = await getUsuarioLogado();
//           setNomeUsuario(usuario.nome); // só o nome do usuário logado
//         } catch (error) {
//           console.error("Erro ao buscar usuário logado:", error);
//         }
//       };

//       fetchNomeUsuario();
//     }, []);   
 
//   const handleLogout  = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("photo");
//     navigate("/"); 
//   };

//   const linksPermissions = (role) => {
//     const linksHome = [
//       { label: "Acessos",   path: "/home/acessos" },
//       { label: "Usuários",  path: "/home/usuarios" },
//       { label: "Anotações", path: "/home/anotacoes" },
//       { label: "Tarefas",   path: "/home/tarefas" },
//       { label: "Sair",      path: "logout" } 
//     ];

//     const linksUser = [
//       { label: "Anotações", path: "/home/anotacoes" },
//       { label: "Tarefas",   path: "/home/tarefas" },
//       { label: "Sair",      path: "logout" }
//     ];

//     return role === "ROLE_ADMIN" ? linksHome : linksUser;
//   };

//   const links = linksPermissions(role);
  
//   return (
//     <div className="layout">
//       <aside className={"sidebar"}>
//         <div className="areaFoto">
//           <img src={photoUrl} alt="Foto do usuário" className="foto_user" />
//           <span 
//             className="text-center nomeUsuario">Bem, vindo<br/>
//             {nomeUsuario
//               ? nomeUsuario.length > 20
//                 ? nomeUsuario.slice(0, 20) + "..."
//                 : nomeUsuario
//               : ""
//             }           
//           </span>
          
//           <span className="small">
//             {roleRaw === "ROLE_ADMIN" ? "Administrador" : "Usuário"}
//           </span>

//         </div>

//         <nav className="nav">
//           <ul>
//             {links.map((link) => (
//               <li key={link.path}>
//                 {link.path === "logout" ? (
//                   <NavLink
//                     to="/"
//                     className="nav-link"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleLogout();
//                     }}
//                   >
//                     {link.label}
//                   </NavLink>
//                 ) : (
//                   <NavLink
//                     to={link.path}
//                     className={({ isActive }) =>
//                       isActive ? "nav-link active" : "nav-link"
//                     }
//                     onClick={hiddenLogo}
//                   >
//                     {link.label}
//                   </NavLink>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </aside>

//       <main className="contentAdmin">
//         <Outlet
//           context={{
//             ...parentContext,   // ⭐ ESSENCIAL
//             textoTitle,
//             setTextoTitle,
//             onMenuClick: toggleMenu
//           }}
//         />      

//         <div className="area_logoHome">
//             <img src="/logo.png" alt="logo" className="logoHome"/>
//             <h2>EDSOF INFORMÁTICA</h2>
//         </div>

//       </main>
      
//       {/* Menu mobile */}
//       <MobileMenu 
//         open={menuOpen} 
//         onClose={() => setMenuOpen(false)} 
//       />
      
//     </div>
//   );
// };

// export default Home;

import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FotoPadrao from "../../assets/default-photo.png";
import { getUsuarioLogado } from "../../services/ServiceUsuarios";
import { getUser } from "../../utils/auth";
import MobileMenu from "../../components/MobileMenu";
import "./Home.css";

const Home = () => {
  const [textoTitle, setTextoTitle]   = useState("Cadastrar Acesso");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [menuOpen, setMenuOpen]       = useState(false);
  const navigate                      = useNavigate();
  const location                      = useLocation();   // ⭐ pega rota atual
  const photo                         = localStorage.getItem("photo");  

  const API_URL = "http://localhost:8081";
  
  const photoUrl = photo 
    ? `${API_URL}/uploads/usuarios/${photo}` 
    : FotoPadrao;

  const roleRaw = getUser()?.role || "";
  const role = roleRaw.startsWith("ROLE_") ? roleRaw : `ROLE_${roleRaw}`;
  const parentContext = useOutletContext() || {};

  function toggleMenu() {
    setMenuOpen(!menuOpen);   
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
          <img src={photoUrl} alt="Foto do usuário" className="foto_user" />
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
            <img src="/logo.png" alt="logo" className="logoHome"/>
            <h2>EDSOF INFORMÁTICA</h2>
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
    </div>
  );
};

export default Home;
