import { useState } from "react"
import  Foto        from "../../assets/usuario.png"
import { Outlet, useNavigate }   from "react-router-dom"
import "./Admin.css"

const Admin = () => {
  const navigate                    = useNavigate()
  const [textoTitle, setTextoTitle] = useState("Cadastrar Acesso") 

  return (
    <div className="layout">  
    
        <aside className="sidebar">     
            <div className="areaFoto">
              <img src={Foto} alt="Foto" className="foto_user"/>
            </div>   
                    
            <nav className="nav">              
              <ul>
                  <li><a href="#" onClick={(e)=>{e.preventDefault(); navigate("/")}}>Acessos</a></li>
                  <li><a href="#">Usuários</a></li>
                  <li><a href="#">Anotações</a></li>
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
