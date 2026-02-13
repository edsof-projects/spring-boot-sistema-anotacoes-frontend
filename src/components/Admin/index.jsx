import { useState }                      from "react"
import  Foto                             from "../../assets/usuario_padrao.png"
import { NavLink, Outlet }               from "react-router-dom"
import "./Admin.css"

const Admin = () => {
  const [textoTitle, setTextoTitle] = useState("Cadastrar Acesso") 

  return (
    <div className="layout">  
    
        <aside className="sidebar">     
            <div className="areaFoto">
              <img src={Foto} alt="Foto" className="foto_user"/>
            </div>   
                    
            <nav className="nav">              
              <ul>
                  <li>
                    <NavLink
                      to="/"
                      end
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                      Acessos
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/usuarios"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >    
                      Usuários
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/anotacoes"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                      Anotações
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/tarefas"
                      className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                    >
                      Tarefas
                    </NavLink>
                  </li>
              </ul>
            </nav>   
                
        </aside>

        <main className="content">     
            <Outlet context={{ textoTitle, setTextoTitle }} />
        </main>        

      </div>
  )
}

export default Admin
