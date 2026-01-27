import { useMatch } from "react-router-dom"

export function useCrudMode(basePath) {
  const isCadastrar = useMatch(`/${basePath}/cadastrar`)
  const isEditar    = useMatch(`/${basePath}/editar/:id`)
  const isDeletar   = useMatch(`/${basePath}/deletar/:id`)

  let mode = "CADASTRAR"

  if (isEditar)  mode = "EDITAR"
  if (isDeletar) mode = "DELETAR"

  return {
    mode,
    isCadastrar: !!isCadastrar,
    isEditar:    !!isEditar,
    isDeletar:   !!isDeletar
  }

}
