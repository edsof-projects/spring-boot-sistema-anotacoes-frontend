import { Route, Routes }                from 'react-router-dom';

import CadAcesso                        from './pages/Acessos/CadAcesso';
import ListAcessos                      from './pages/Acessos/ListAcessos';
import CadUsuario                       from './pages/Usuarios/CadUsuario';
import ListUsuarios                     from './pages/Usuarios/ListUsuarios';
import CadAnotacao                      from './pages/Anotacoes/CadAnotacao';
import ListAnotacoes                    from './pages/Anotacoes/ListAnotacoes';
import CadTarefa                        from './pages/Tarefas/CadTarefa';
import ListTarefas                      from './pages/Tarefas/ListTarefas';
import ResetarSenha                     from './pages/ResetarSenha';
import Login                            from './pages/Login';
import Home                             from './pages/Home';
import PrivateRoute                     from './components/PrivateRoute';

function AppRoutes() {
  return (
      <Routes>
        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ADMIN LAYOUT NÃO protegido */}
        <Route
          path="/home"
          element={
            <PrivateRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}>
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
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <CadAnotacao />
              </PrivateRoute>
            }
          />
          <Route
            path="anotacoes/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
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
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <CadTarefa />
              </PrivateRoute>
            }
          />
          <Route
            path="tarefas/deletar/:id"
            element={
              <PrivateRoute allowedRoles={["ROLE_ADMIN", "ROLE_USER"]}>
                <CadTarefa />
              </PrivateRoute>
            }
          />
        </Route>
        <Route 
            path="/resetar-senha" 
            element={<ResetarSenha />} 
        />
      </Routes>      
  );
}

export default AppRoutes;