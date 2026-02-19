import { useState }                      from "react"
import  Foto                             from "../../assets/default-photo.png"
import  Logo                             from "/logo.png"
import { NavLink, Outlet }               from "react-router-dom"
import "./Admin.css"

const Admin = () => {
  const [textoTitle, setTextoTitle] = useState("Cadastrar Acesso") 
  const usuario                     = null         // futuramente virá do contexto ou auth
  const [showLogo, setShowLogo]     = useState(true)

  const hiddenLogo = () => {
     setShowLogo(false)
  }

  return (
    <div className="layout">      
        
        <aside className="sidebar">     
            <div className="areaFoto">
              <img
                src={usuario?.foto || Foto}
                alt="Foto"
                className="foto_user"
              />              
            </div>   
                    
            <nav className="nav">              
              <ul>
                  <li>
                    <NavLink
                      to="/admin/acessos"
                      end
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={hiddenLogo}
                    >
                      Acessos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/usuarios"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={hiddenLogo}
                    >    
                      Usuários
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/anotacoes"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={hiddenLogo}
                    >
                      Anotações
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/tarefas"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                      onClick={hiddenLogo}
                    >
                      Tarefas
                    </NavLink>
                  </li>
              </ul>
            </nav>   
                
        </aside>
         
        <main className="content">               
            <Outlet context={{ textoTitle, setTextoTitle }} />
            {showLogo && (
              <div className="d-flex flex-column">
                <img        
                    src={Logo} 
                    alt="logo" 
                    className="logo" id="logo"  
                />
                <h1 className="my-3 title">Administração</h1>
              </div>
            )}
        </main>        

      </div>
  )
}

export default Admin
