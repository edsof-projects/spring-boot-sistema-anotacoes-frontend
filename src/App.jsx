import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin                            from './components/Admin'
import CadAcesso                        from './components/Acessos/CadAcesso'
import ListAcessos                      from './components/Acessos/ListAcessos'
import CadUsuario                       from './components/Usuarios/CadUsuario'
import ListUsuarios                     from './components/Usuarios/ListUsuarios'
import './Global.css'

function App() {

  return (                   

    <BrowserRouter>
      <Routes>

        <Route element={<Admin />}>

          {/* ACESSOS */}
          <Route index element={<ListAcessos />} />
          <Route path="acessos/cadastrar"    element={<CadAcesso />} />
          <Route path="acessos/editar/:id"   element={<CadAcesso />} />
          <Route path="acessos/deletar/:id"  element={<CadAcesso />} />

          {/* USUÁRIOS */}
          <Route path="usuarios"             element={<ListUsuarios />} />
          <Route path="usuarios/cadastrar"   element={<CadUsuario />} />
          <Route path="usuarios/editar/:id"  element={<CadUsuario />} />
          <Route path="usuarios/deletar/:id" element={<CadUsuario />} />

        </Route>

      </Routes>
    </BrowserRouter>


  )
}

export default App
