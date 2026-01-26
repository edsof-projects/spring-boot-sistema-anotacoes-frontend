import { useState } from "react"

export function useModalVisualizacao() {
  const [isOpen, setIsOpen]                   = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState(null)  

  function abrirModal(item) {
    setItemSelecionado(item)
    setIsOpen(true)
  }

  function fecharModal() {
    setIsOpen(false)
    setItemSelecionado(null)
  }

  return {
    isOpen,
    itemSelecionado,
    abrirModal,
    fecharModal
  }
}
