import { useMatch } from "react-router-dom"

export function useCrudMode(basePath) {
  const isEditar    = useMatch(`/home/${basePath}/editar/:id`)
  const isDeletar   = useMatch(`/home/${basePath}/deletar/:id`)

  let mode = "CADASTRAR"

  if (isEditar)  mode = "EDITAR"
  if (isDeletar) mode = "DELETAR"

  return {
    mode,
    isCadastrar : mode === "CADASTRAR",
    isEditar    : mode === "EDITAR",
    isDeletar   : mode === "DELETAR"
  }

}
