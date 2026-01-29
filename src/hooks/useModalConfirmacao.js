import { useState } from "react"

export function useModalConfirmacao() {
  const [isOpen, setIsOpen] = useState(false)

  function abrirModal() {
    setIsOpen(true)
  }

  function fecharModal() {
    setIsOpen(false)
  }

  return {
    isOpen,
    abrirModal,
    fecharModal
  }
}
