import "./mobileMenu.css";
import { getUser }                       from "../../utils/auth"
import { NavLink }                       from "react-router-dom";

export default function MobileMenu({ open, onClose }) {
  

  const roleRaw = getUser()?.role || "";

  // normaliza role vinda do backend
  const role = roleRaw.startsWith("ROLE_")
    ? roleRaw
    : `ROLE_${roleRaw}`;

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
    
    const handleLogout = () => {
      localStorage.clear();
      onClose();
      window.location.href = "/";
    };
  
    return (
    <div className={`mobile-overlay ${open ? "active" : ""}`}>
      
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>     

      <nav className="mobile-nav">
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
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

    </div>
  );
}
