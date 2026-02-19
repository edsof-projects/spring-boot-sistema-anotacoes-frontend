import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CadAcesso                        from './components/Acessos/CadAcesso'
import ListAcessos                      from './components/Acessos/ListAcessos'
import CadUsuario                       from './components/Usuarios/CadUsuario'
import ListUsuarios                     from './components/Usuarios/ListUsuarios'
import CadAnotacao                      from './components/Anotacoes/CadAnotacao'
import ListAnotacoes                    from './components/Anotacoes/ListAnotacoes'
import CadTarefa                        from './components/Tarefas/CadTarefa'
import ListTarefas                      from './components/Tarefas/ListTarefas'
import Login                            from './components/Login'
import Admin                            from './components/Admin'

import './Global.css'

function App() {

  return (                   

    <BrowserRouter>
      <Routes>
        {/* LOGIN */} 
        <Route path="/" element={<Login />} />
         
        {/* ADMIN LAYOUT */}
        <Route path="/admin"                 element={<Admin />}>

          {/* ACESSOS */}
          <Route path="acessos"              element={<ListAcessos />} />
          <Route path="acessos/cadastrar"    element={<CadAcesso />} />
          <Route path="acessos/editar/:id"   element={<CadAcesso />} />
          <Route path="acessos/deletar/:id"  element={<CadAcesso />} />

          {/* USUÁRIOS */}
          <Route path="usuarios"             element={<ListUsuarios />} />
          <Route path="usuarios/cadastrar"   element={<CadUsuario />} />
          <Route path="usuarios/editar/:id"  element={<CadUsuario />} />
          <Route path="usuarios/deletar/:id" element={<CadUsuario />} />

          {/* ANOTAÇÕES */}
          <Route path="anotacoes"             element={<ListAnotacoes />} />
          <Route path="anotacoes/cadastrar"   element={<CadAnotacao />} />
          <Route path="anotacoes/editar/:id"  element={<CadAnotacao />} />
          <Route path="anotacoes/deletar/:id" element={<CadAnotacao />} />

          {/* TAREFAS */}
          <Route path="tarefas"             element={<ListTarefas />} />
          <Route path="tarefas/cadastrar"   element={<CadTarefa />} />
          <Route path="tarefas/editar/:id"  element={<CadTarefa />} />
          <Route path="tarefas/fechar/:id"  element={<CadTarefa />} />
          <Route path="tarefas/deletar/:id" element={<CadTarefa />} />  

        </Route>

      </Routes>
    </BrowserRouter>


  )
}

export default App
