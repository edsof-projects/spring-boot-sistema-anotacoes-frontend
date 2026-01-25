import { useEffect, useState } from "react"
import {
  createAcesso,
  deleteAcesso,
  editAcesso,
  getTipoById
} from "../../../services/ServiceAcessos"

import {
  useNavigate,
  useParams,
  useMatch
} from "react-router-dom"

import { useModalExclusao }       from "../../../hooks/useModalExclusao"
import ModalExclusao              from "../../Modals/ModalExclusao"
import Title                      from "../../Title"
import "./CadAcesso.css"

const CadAcesso = () => {

  const [tipo, setTipo]                           = useState("")
  const [errors, setErrors]                       = useState({ tipo: "" })
  const [apiError, setApiError]                   = useState("")
  const [successMsg, setSuccessMsg]               = useState("")

  const { id }                                    = useParams()
  const navigate                                  = useNavigate()

  const isCadastrar                               = useMatch("/acessos/cadastrar")
  const isEditar                                  = useMatch("/acessos/editar/:id")
  const isDeletar                                 = useMatch("/acessos/deletar/:id")

    const {
      isOpen,
      abrirModal,
      fecharModal
    } = useModalExclusao()

  /* ========================
     BUSCA REGISTRO POR ID
  ======================== */
  useEffect(() => {
    if (id) {
      getTipoById(id)
        .then((res) => {
          setTipo(res.data.tipo)
        })
        .catch(() => {
          setApiError("Erro ao carregar o tipo de acesso.")
        })
    }
  }, [id])

  function voltarParaListagem() {
    navigate("/")
  }

  function validateForm() {
    if (isDeletar) return true

    const newErrors = {}

    if (!tipo.trim()) newErrors.tipo = "Informe o tipo de acesso."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0

  }

  /* ========================
     SUBMIT PRINCIPAL
  ======================== */
  function handleSubmit(e) {
    e.preventDefault()
    setApiError("")
    setSuccessMsg("")

    if (!validateForm()) return

    // provisório até JWT
    const payload = { tipo }

    if (isCadastrar) {
      createAcesso(payload)
        .then(() => {
          setSuccessMsg("Nível de acesso cadastrado com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao cadastrar. Tipo de acesso já cadastrado.")
        })
    }

    if (isEditar && id) {
      editAcesso(payload, id)
        .then(() => {
          setSuccessMsg("Nível de acesso atualizado com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao atualizar tipo de acesso.")
        })
    }

   if (isDeletar) {
      abrirModal()
    }
  }

  /* ========================
     CONFIRMAR DELETE
  ======================== */
  function confirmDelete() {
    deleteAcesso(id)
      .then(() => {
        fecharModal()
        setSuccessMsg("Tipo de acesso excluído com sucesso!")
        setTimeout(voltarParaListagem, 2000)
      })
      .catch(() => {
        setApiError("Erro ao excluir tipo de acesso.")
        fecharModal()
      })
  }

  /* ============================
     TEXTOS DINÂMICOS DOS TÍTULOS
  =============================== */
  const tituloPagina = isCadastrar
    ? "Cadastrar Acesso"
    : isEditar
    ? `Editar Acesso  - Id : ${id}`
    : `Excluir Acesso - Id : ${id}`

  const textoBotao = isCadastrar 
      ? "Salvar"
      :  isEditar 
      ? "Atualizar"
      : "Excluir"

  const classeBotao = isDeletar ? "btn-danger" : "btn-success"

  /* ========================
     RENDER
  ======================== */
  return (
    <div className="cadAcesso">

      <Title title={tituloPagina} isPrimario />

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {apiError && (
        <div className="alert alert-danger">{apiError}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control ${errors.tipo ? "is-invalid" : ""}`}
          type="text"
          value={tipo}
          placeholder="Tipo de acesso"
          disabled={isDeletar}
          onChange={(e) => setTipo(e.target.value)}
        />

        {errors.tipo && (
          <div className="invalid-feedback">{errors.tipo}</div>
        )}

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className={`px-4 btn ${classeBotao}`}>
            {textoBotao}
          </button>

          <button
            type="button"
            className="btn btn-secondary px-4"
            onClick={voltarParaListagem}
          >
            Voltar
          </button>
        </div>
      </form>
     
       {/* MODAL EXCLUSÃO */}
      <ModalExclusao
        isOpen      ={isOpen}
        mensagem    ="Deseja realmente excluir o tipo de acesso?"
        id          ={id}
        nome        ={tipo}
        onConfirmar ={confirmDelete}
        onCancelar  ={fecharModal}
      />

    </div>
  )
}

export default CadAcesso