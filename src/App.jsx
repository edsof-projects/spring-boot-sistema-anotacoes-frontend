import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin                            from './components/Admin'
import CadAcesso                        from './components/Acessos/CadAcesso'
import ListAcessos                      from './components/Acessos/ListAcessos'
import './Global.css'

function App() {

  return (                   

      <BrowserRouter>
        <Routes>

            <Route element={<Admin />}>
              <Route index element={<ListAcessos />} />
              <Route path="acessos/cadastrar"   element={<CadAcesso />} />
              <Route path="acessos/editar/:id"  element={<CadAcesso />} />   
              <Route path="acessos/deletar/:id" element={<CadAcesso />} />   
            </Route>   

        </Routes>
    </BrowserRouter>

  )
}

export default App
