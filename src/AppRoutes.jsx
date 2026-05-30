import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import ResetarSenha from "./pages/ResetarSenha";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import ListAcessos from "./pages/Acessos/ListAcessos";
import CadAcesso from "./pages/Acessos/CadAcesso";

import ListUsuarios from "./pages/Usuarios/ListUsuarios";
import CadUsuario from "./pages/Usuarios/CadUsuario";

import ListAnotacoes from "./pages/Anotacoes/ListAnotacoes";
import CadAnotacao from "./pages/Anotacoes/CadAnotacao";

import ListTarefas from "./pages/Tarefas/ListTarefas";
import CadTarefa from "./pages/Tarefas/CadTarefa";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLICAS */}
      <Route path="/" element={<Login />} />
      <Route path="/resetar-senha" element={<ResetarSenha />} />

      {/* ===== HOME + LAYOUT GLOBAL ===== */}
      <Route
        path="/home"
        element={
          <Layout>
            <PrivateRoute allowedRoles={["ROLE_ADMIN","ROLE_USER"]}>
              <Home />
            </PrivateRoute>
          </Layout>
        }
      >

        <Route index element={<ListAnotacoes />} />

        {/* ACESSOS */}
        <Route path="acessos" element={<ListAcessos />} />
        <Route path="acessos/cadastrar" element={<CadAcesso />} />
        <Route path="acessos/editar/:id" element={<CadAcesso />} />
        <Route path="acessos/deletar/:id" element={<CadAcesso />} />

        {/* USUÁRIOS */}
        <Route path="usuarios" element={<ListUsuarios />} />
        <Route path="usuarios/cadastrar" element={<CadUsuario />} />
        <Route path="usuarios/editar/:id" element={<CadUsuario />} />
        <Route path="usuarios/deletar/:id" element={<CadUsuario />} />

        {/* ANOTAÇÕES */}
        <Route path="anotacoes" element={<ListAnotacoes />} />
        <Route path="anotacoes/cadastrar" element={<CadAnotacao />} />
        <Route path="anotacoes/editar/:id" element={<CadAnotacao />} />
        <Route path="anotacoes/deletar/:id" element={<CadAnotacao />} />

        {/* TAREFAS */}
        <Route path="tarefas" element={<ListTarefas />} />
        <Route path="tarefas/cadastrar" element={<CadTarefa />} />
        <Route path="tarefas/editar/:id" element={<CadTarefa />} />
        <Route path="tarefas/deletar/:id" element={<CadTarefa />} />

      </Route>

    </Routes>
  );
}