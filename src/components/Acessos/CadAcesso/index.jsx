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

import Title from "../../Title"
import "./CadAcesso.css"

const CadAcesso = () => {

  const [tipo, setTipo]                           = useState("")
  const [errors, setErrors]                       = useState({ tipo: "" })
  const [apiError, setApiError]                   = useState("")
  const [successMsg, setSuccessMsg]               = useState("")
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const { id }      = useParams()
  const navigate    = useNavigate()

  const isCadastrar = useMatch("/acessos/cadastrar")
  const isEditar    = useMatch("/acessos/editar/:id")
  const isDeletar   = useMatch("/acessos/deletar/:id")

  /* ========================
     BUSCA REGISTRO POR ID
  ======================== */
  useEffect(() => {
    if (id) {
      getTipoById(id)
        .then((response) => {
          setTipo(response.data.tipo)
        })
        .catch(() => {
          setApiError("Erro ao carregar o registro.")
        })
    }
  }, [id])

  function voltarParaListagem() {
    navigate("/")
  }

  function validateForm() {
    if (isDeletar) return true

    if (!tipo.trim()) {
      setErrors({ tipo: "Informe o tipo de acesso." })
      return false
    }

    setErrors({ tipo: "" })
    return true
  }

  /* ========================
     SUBMIT PRINCIPAL
  ======================== */
  function handleSubmit(e) {
    e.preventDefault()
    setApiError("")
    setSuccessMsg("")

    if (!validateForm()) return

    const payload = { tipo }

    if (isCadastrar) {
      createAcesso(payload)
        .then(() => {
          setSuccessMsg("Nível de acesso cadastrado com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Erro ao cadastrar. Registro já existente.")
        })
    }

    if (isEditar && id) {
      editAcesso(payload, id)
        .then(() => {
          setSuccessMsg("Nível de acesso atualizado com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Erro ao editar o registro.")
        })
    }

    if (isDeletar) {
      setShowConfirmDelete(true)
    }
  }

  /* ========================
     CONFIRMA DELETE
  ======================== */
  function confirmDelete() {
    deleteAcesso(id)
      .then(() => {
        setShowConfirmDelete(false)
        setSuccessMsg("Registro excluído com sucesso!")
        setTimeout(voltarParaListagem, 2500)
      })
      .catch(() => {
        setApiError("Erro ao excluir o registro.")
        setShowConfirmDelete(false)
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

  const textoBotao = 
      isCadastrar ? "Salvar"
      :  isEditar ? "Atualizar"
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

      {/* ========================
          MODAL CONFIRMAÇÃO DELETE
      ============================ */}
      {showConfirmDelete && (
        <>
          <div className="modal fade show d-block modal-fullscreen" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered ">
              <div className="modal-content p-4 rounded-2 md-5">

                <div className="modal-header">
                  <h5 className="modal-title text-danger">
                    Confirmar exclusão
                  </h5>                 
                </div>

                <div className="modal-body">
                  <p>Deseja realmente excluir o acesso?</p>
                  <div className="d-flex align-items-space-beetwen">
                      <p>id   : <strong className="text-danger ">{id}</strong></p>
                      <p>Tipo : <strong className="text-danger ">{tipo}</strong></p>                      
                  </div>
                </div>

                <div className="modal-footer">                  

                    <button
                      className="btn btn-danger px-4"
                      onClick={confirmDelete}
                    >
                      Excluir
                    </button>

                    <button
                      className="btn btn-secondary"
                      onClick={() => voltarParaListagem()}
                    >
                      Cancelar
                    </button>

                </div>

              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show modal-fullscreen"></div>
        </>
      )}

    </div>
  )
}

export default CadAcesso