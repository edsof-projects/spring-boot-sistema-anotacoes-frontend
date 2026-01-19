import { useState } from "react"
import  Foto        from "../../assets/usuario.png"
import  ListAcessos from "../Acessos/ListAcessos"
import  CadAcesso   from "../Acessos/CadAcesso"
import "./Admin.css"

const Admin = () => {
  const [cadastrando, setCadastrando] = useState(false)

  function abrirListagem(e){
    e.preventDefault()
     setCadastrando(false)
  }

  return (
    <div className="layout">  
    
        <aside className="sidebar">     
            <div className="areaFoto">
              <img src={Foto} alt="Foto" className="foto_user"/>
            </div>   
                    
            <nav className="nav">              
              <ul>
                  <li><a href="/" onClick={abrirListagem}>Acessos</a></li>
                  <li><a href="#">Usuários</a></li>
                  <li><a href="#">Anotações</a></li>
              </ul>
            </nav>   
                
        </aside>

        <main className="content">     
          {cadastrando
            ? <CadAcesso setCadastrando={setCadastrando} />
            : <ListAcessos setCadastrando={setCadastrando} />
          }
        </main>        

      </div>
  )
}

export default Admin
