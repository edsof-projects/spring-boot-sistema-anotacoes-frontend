import { useMatch } from "react-router-dom"

export function useCrudMode(basePath) {
  const isCadastrar = useMatch(`/${basePath}/cadastrar`)
  const isEditar    = useMatch(`/${basePath}/editar/:id`)
  const isDeletar   = useMatch(`/${basePath}/deletar/:id`)

  const mode = isCadastrar
    ? "CADASTRAR"
    : isEditar
    ? "EDITAR"
    : isDeletar
    ? "DELETAR"
    : null

  return {
    mode,
    isCadastrar : !!isCadastrar,
    isEditar    : !!isEditar,
    isDeletar   : !!isDeletar
  }
}
