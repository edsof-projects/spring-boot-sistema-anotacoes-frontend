import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './components/Admin'
import Title from './components/Title'
import './Global.css'
import CadAcesso from './components/Acessos/CadAcesso'

function App() {

  return (
    <>
    <BrowserRouter>    
      <Routes>

        {/* <Title title="Administração" isPrimario={false}/> */}
        {/* http://localhost/5173/admin */}
        {/* <Route path='/admin' element={<Admin />}></Route> */}
        <Route path='/' element={<Admin />}></Route>

        {/* http://localhost/5173/cadacesso */}
        <Route path='/cadacesso' element={<CadAcesso />}></Route>
        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
