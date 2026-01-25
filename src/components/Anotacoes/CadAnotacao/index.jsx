import { useEffect, useState } from "react"
import {
  createAnotacao,
  deleteAnotacao,
  editAnotacao,
  getAnotacaoById
} from "../../../services/ServiceAnotacoes"

import {
  useNavigate,
  useParams,
  useMatch
} from "react-router-dom"

import { primeiraLetraMaiuscula } from "../../../utils/formatters"
import { useModalExclusao }       from "../../../hooks/useModalExclusao"
import ModalExclusao              from "../../Modals/ModalExclusao"
import Title                      from "../../Title"
import "./CadAnotacao.css"

const CadAnotacao = () => {

  const [titulo, setTitulo]           = useState("")
  const [descricao, setDescricao]     = useState("")

  const [errors, setErrors]           = useState({})
  const [apiError, setApiError]       = useState("")
  const [successMsg, setSuccessMsg]   = useState("")

  const { id }                        = useParams()
  const navigate                      = useNavigate()

  const isCadastrar                   = useMatch("/anotacoes/cadastrar")
  const isEditar                      = useMatch("/anotacoes/editar/:id")
  const isDeletar                     = useMatch("/anotacoes/deletar/:id")

  const {
    isOpen,
    abrirModal,
    fecharModal
  } = useModalExclusao()

  /* ========================
     BUSCAR ANOTAÇÃO POR ID
  ======================== */
  useEffect(() => {
    if (!id) return

    setApiError("")

    getAnotacaoById(id)
      .then(res => {
        setTitulo(res.data.titulo)
        setDescricao(res.data.descricao)
      })
      .catch(() => {
        setApiError("Erro ao carregar a anotação.")
      })
  }, [id])

  function voltarParaListagem() {
    navigate("/anotacoes")
  }

  function validateForm() {
    if (isDeletar) return true

    const newErrors = {}

    if (!titulo.trim())    newErrors.titulo    = "Informe o título"
    if (!descricao.trim()) newErrors.descricao = "Informe a descrição"

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
    const payload = {
      titulo,
      descricao,
      usuarioId: 1
    }

    if (isCadastrar) {
      createAnotacao(payload)
        .then(() => {
          setSuccessMsg("Anotação cadastrada com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao cadastrar anotação.")
        })
    }

    if (isEditar && id) {
      editAnotacao(payload, id)
        .then(() => {
          setSuccessMsg("Anotação atualizada com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao atualizar anotação.")
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
    deleteAnotacao(id)
      .then(() => {
        fecharModal()
        setSuccessMsg("Anotação excluída com sucesso!")
        setTimeout(voltarParaListagem, 2000)
      })
      .catch(() => {
        setApiError("Erro ao excluir a anotação.")
        fecharModal()
      })
  }

  /* ========================
     TEXTOS DINÂMICOS
  ======================== */
  const tituloPagina = isCadastrar
    ? "Cadastrar Anotação"
    : isEditar
    ? `Editar Anotação - Id: ${id}`
    : `Excluir Anotação - Id: ${id}`

  const textoBotao = isCadastrar
    ? "Salvar"
    : isEditar
    ? "Atualizar"
    : "Excluir"

  const classeBotao = isDeletar ? "btn-danger" : "btn-success"

  /* ========================
     RENDER
  ======================== */
  return (
    <div className="cadAnotacao">

      <Title title={tituloPagina} isPrimario />

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control mb-2 ${errors.titulo ? "is-invalid" : ""}`}
          type="text"
          value={titulo}
          placeholder="Título"
          disabled={isDeletar}
          onChange={e => setTitulo(e.target.value)}
          onBlur={e => setTitulo(primeiraLetraMaiuscula(e.target.value))}
        />
        {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}

        <textarea
          className={`form-control mb-2 ${errors.descricao ? "is-invalid" : ""}`}
          rows={10}
          value={descricao}
          placeholder="Descrição"
          disabled={isDeletar}
          onChange={e => setDescricao(e.target.value)}
          onBlur={e => setDescricao(primeiraLetraMaiuscula(e.target.value))}
        />
        {errors.descricao && (
          <div className="invalid-feedback">{errors.descricao}</div>
        )}

        <div className="d-flex gap-2 mt-3">
          <button type="submit" className={`btn ${classeBotao}`}>
            {textoBotao}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={voltarParaListagem}
          >
            Voltar
          </button>
        </div>
      </form>

      {/* MODAL EXCLUSÃO */}
      <ModalExclusao
        isOpen      ={isOpen}
        mensagem    ="Deseja realmente excluir a anotação?"
        id          ={id}
        nome        ={titulo}
        onConfirmar ={confirmDelete}
        onCancelar  ={fecharModal}
      />

    </div>
  )
}

export default CadAnotacao
