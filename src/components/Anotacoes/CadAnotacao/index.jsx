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

import { primeiraLetraMaiuscula }       from "../../../utils/formatters"
import Title                            from "../../Title"
import "./CadAnotacao.css"

const CadAnotacao = () => {

  const [titulo,  setTitulo]                       = useState("")
  const [descricao, setDescricao]                  = useState("")

  const [errors, setErrors]                        = useState({})
  const [apiError, setApiError]                    = useState("")
  const [successMsg, setSuccessMsg]                = useState("")
  const [showConfirmDelete, setShowConfirmDelete]  = useState(false)

  const { id }                                     = useParams()
  const navigate                                   = useNavigate()

  const isCadastrar                                = useMatch("/anotacoes/cadastrar")
  const isEditar                                   = useMatch("/anotacoes/editar/:id")
  const isDeletar                                  = useMatch("/anotacoes/deletar/:id")

  /* ========================
     BUSCA REGISTRO POR ID
  ======================== */
 
 useEffect(() => {
    if (!id) return

    setApiError("")

    getAnotacaoById(id)
      .then((response) => {
        setTitulo(response.data.titulo)
        setDescricao(response.data.descricao)
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

      if (!titulo.trim())    newErrors.titulo      = "Informe o titulo"
      if (!descricao.trim()) newErrors.descricao   = "Informe a descrição"

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
    
    const payload = { titulo, descricao, usuarioId : 13 }

    if (isCadastrar) {
      createAnotacao(payload)
        .then(() => {
          setSuccessMsg("Anotação cadastrada com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Erro ao cadastrar a anotação!")
          setTimeout(voltarParaListagem, 2500)
        })
    }

    if (isEditar && id) {
      editAnotacao(payload, id)
        .then(() => {
          setSuccessMsg("Anotação atualizada com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Erro ao atualizar anotação.")
          setTimeout(voltarParaListagem, 2500)
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
    deleteAnotacao(id)
      .then(() => {
        setShowConfirmDelete(false)
        setSuccessMsg("Anotação excluída com sucesso!")       
        setTimeout(voltarParaListagem, 2500)
      })
      .catch(() => {
        setApiError("Erro ao excluir a anotação.")
        setShowConfirmDelete(false)
      })
  }

  /* ============================
     TEXTOS DINÂMICOS DOS TÍTULOS
  =============================== */
  const tituloPagina = isCadastrar
    ? "Cadastrar Anotacao"
    : isEditar
    ? `Editar Anotacao  - Id : ${id}`
    : `Excluir Anotacao - Id : ${id}`

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
    <div className="cadAnotacao">

      <Title title={tituloPagina} isPrimario />

      {successMsg && (<div className="alert alert-success">{successMsg}</div>)}

      {apiError && (<div className="alert alert-danger">{apiError}</div>)}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control mb-2 ${errors.titulo ? "is-invalid" : ""}`}
          type="text"
          value={titulo}
          placeholder="Titulo"
          disabled={isDeletar}
          onChange={(e) => setTitulo(e.target.value)}
          onBlur={(e)   => setTitulo(primeiraLetraMaiuscula(e.target.value))}
        />
         {errors.titulo && (<div className="invalid-feedback">{errors.titulo}</div>)}

        <textarea
          className={`form-control mb-2 ${errors.descricao ? "is-invalid" : ""}`}          
          rows={20}
          value={descricao}
          placeholder="Descricao"
          disabled={isDeletar}
          onChange={(e) => setDescricao(e.target.value)}
          onBlur={(e)   => setDescricao(primeiraLetraMaiuscula(e.target.value))}
        />
        {errors.descricao && (<div className="invalid-feedback">{errors.descricao}</div>)}
               
        <div className="d-flex gap-2 mt-3">
          <button type="submit" className={`btn ${classeBotao}`}>
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
                  <p>Deseja realmente excluir a Anotacao?</p>
                  <div className="d-flex align-items-space-beetwen">
                      <p>id   : <strong className="text-danger ">{id}</strong></p>&nbsp;&nbsp;
                      <p>Anotacao : <strong className="text-danger ">{titulo}</strong></p>                      
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

export default CadAnotacao