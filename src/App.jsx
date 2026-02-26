import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadAcesso from './components/Acessos/CadAcesso';
import ListAcessos from './components/Acessos/ListAcessos';
import CadUsuario from './components/Usuarios/CadUsuario';
import ListUsuarios from './components/Usuarios/ListUsuarios';
import CadAnotacao from './components/Anotacoes/CadAnotacao';
import ListAnotacoes from './components/Anotacoes/ListAnotacoes';
import CadTarefa from './components/Tarefas/CadTarefa';
import ListTarefas from './components/Tarefas/ListTarefas';
import Login from './components/Login';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

import './Global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN LAYOUT NÃO protegido */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          {/* ACESSOS - só ROLE_ADMIN */}
          <Route
            path="acessos"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <ListAcessos />
              </PrivateRoute>
            }
          />
          <Route
            path="acessos/cadastrar"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadAcesso />
              </PrivateRoute>
            }
          />
          <Route
            path="acessos/editar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadAcesso />
              </PrivateRoute>
            }
          />
          <Route
            path="acessos/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadAcesso />
              </PrivateRoute>
            }
          />
          {/* USUÁRIOS - só ROLE_ADMIN */}
          <Route
            path="usuarios"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <ListUsuarios />
              </PrivateRoute>
            }
          />
          <Route
            path="usuarios/cadastrar"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadUsuario />
              </PrivateRoute>
            }
          />
          <Route
            path="usuarios/editar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadUsuario />
              </PrivateRoute>
            }
          />
          <Route
            path="usuarios/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadUsuario />
              </PrivateRoute>
            }
          />
          {/* ANOTAÇÕES - ROLE_ADMIN e ROLE_USER */}
          <Route
            path="anotacoes"
            element={
              <PrivateRoute>
                <ListAnotacoes />
              </PrivateRoute>
            }
          />
          <Route
            path="anotacoes/cadastrar"
            element={
              <PrivateRoute>
                <CadAnotacao />
              </PrivateRoute>
            }
          />
          <Route
            path="anotacoes/editar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadAnotacao />
              </PrivateRoute>
            }
          />
          <Route
            path="anotacoes/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadAnotacao />
              </PrivateRoute>
            }
          />
          {/* TAREFAS - ROLE_ADMIN e ROLE_USER */}
          <Route
            path="tarefas"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <ListTarefas />
              </PrivateRoute>
            }
          />
          <Route
            path="tarefas/cadastrar"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <CadTarefa />
              </PrivateRoute>
            }
          />
          <Route
            path="tarefas/editar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadTarefa />
              </PrivateRoute>
            }
          />
          <Route
            path="tarefas/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN"]}>
                <CadTarefa />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;