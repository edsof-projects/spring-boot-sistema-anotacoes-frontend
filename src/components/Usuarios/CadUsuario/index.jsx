import { useEffect, useState } from "react"
import {
  createUsuario,
  deleteUsuario,
  editUsuario,
  getUsuarioById
} from "../../../services/ServiceUsuarios"

import {
  useNavigate,
  useParams,
  useMatch
} from "react-router-dom"

import { getAllAcessos }    from "../../../services/ServiceAcessos"
import { formatarNome }     from "../../../utils/formatters"
import { useModalExclusao } from "../../../hooks/useModalExclusao"
import ModalExclusao        from "../../Modals/ModalExclusao"
import Title                from "../../Title"
import "./CadUsuario.css"

const CadUsuario = () => {

  const [nome,  setNome]                            = useState("")
  const [email, setEmail]                           = useState("")
  const [nivelAcesso, setNivelAcesso]               = useState("")
  const [niveisAcesso, setNiveisAcesso]             = useState([])


  const [errors, setErrors]                         = useState({})
  const [apiError, setApiError]                     = useState("")
  const [successMsg, setSuccessMsg]                 = useState("")
  const [showConfirmDelete, setShowConfirmDelete]   = useState(false)

  const { id }                                      = useParams()
  const navigate                                    = useNavigate()

  const isCadastrar                                 = useMatch("/usuarios/cadastrar")
  const isEditar                                    = useMatch("/usuarios/editar/:id")
  const isDeletar                                   = useMatch("/usuarios/deletar/:id")

    const {
    isOpen,
    abrirModal,
    fecharModal
  } = useModalExclusao()

  /* ========================
     BUSCA REGISTRO POR ID
  ======================== */

  const allNiveisAcesso =()=>{
    getAllAcessos()
    .then(res => {
      setNiveisAcesso(res.data)
    })
    .catch(() => {
      setApiError("Erro ao carregar níveis de acesso.")
    })
  }

  useEffect(() => {
    if(!isDeletar){
      allNiveisAcesso()
    }
    if (id) {      
      getUsuarioById(id)
        .then((res) => {
          setNome(res.data.nome)
          setEmail(res.data.email)
          setNivelAcesso(res.data.nivelAcessoId || "")
        })
        .catch(() => {
          setApiError("Erro ao carregar o usuário.")
        })
    }
  }, [id])

  function voltarParaListagem() {
    navigate("/usuarios")
  }

  function validateForm() {
      if (isDeletar) return true

      const newErrors = {}

      if (!nome.trim())  newErrors.nome        = "Informe o nome"
      if (!email.trim()) newErrors.email       = "Informe o email"
      if (!nivelAcesso)  newErrors.nivelAcesso = "Selecione o nível de acesso"

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

    const payload = { nome, email, senha : "eas1708", nivelAcessoId: nivelAcesso }

    if (isCadastrar) {
      createUsuario(payload)
        .then(() => {
          setSuccessMsg("Usuario cadastrado com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Este email já esta cadastrado!")
          setTimeout(voltarParaListagem, 2500)
        })
    }

    if (isEditar && id) {
      editUsuario(payload, id)
        .then(() => {
          setSuccessMsg("Usuario atualizado com sucesso!")
          setTimeout(voltarParaListagem, 2500)
        })
        .catch(() => {
          setApiError("Erro ao atualizar usuário.")
          setTimeout(voltarParaListagem, 2500)
        })
    }

    if (isDeletar) {
      abrirModal()
    }
  }

  /* ========================
     CONFIRMA DELETE
  ======================== */
  function confirmDelete() {
    deleteUsuario(id)
      .then(() => {
        fecharModal()
        setSuccessMsg("Usuário excluído com sucesso!")       
        setTimeout(voltarParaListagem, 2500)
      })
      .catch(() => {
        setApiError("Erro ao excluir o usuário.")
        fecharModal()
      })
  }

  /* ============================
     TEXTOS DINÂMICOS DOS TÍTULOS
  =============================== */
  const tituloPagina = isCadastrar
    ? "Cadastrar Usuario"
    : isEditar
    ? `Editar Usuario  - Id : ${id}`
    : `Excluir Usuario - Id : ${id}`

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
    <div className="cadUsuario">

      <Title title={tituloPagina} isPrimario />

      {successMsg && (<div className="alert alert-success">{successMsg}</div>)}

      {apiError && (<div className="alert alert-danger">{apiError}</div>)}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control mb-2 ${errors.nome ? "is-invalid" : ""}`}
          type="text"
          value={nome}
          placeholder="Nome"
          disabled={isDeletar}
          onChange={(e) => setNome(e.target.value)}
          onBlur={(e)   => setNome(formatarNome(e.target.value))}
        />
         {errors.nome && (<div className="invalid-feedback">{errors.nome}</div>)}

        <input
          className={`form-control mb-2 ${errors.email ? "is-invalid" : ""}`}
          type="email" 
          value={email}
          placeholder="Email"
          disabled={isDeletar}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
        
        {!isDeletar && (
          <>
          <select
            className={`form-select ${errors.nivelAcesso ? "is-invalid" : ""}`}
            value={nivelAcesso}
            disabled={isDeletar}
            onChange={(e) => setNivelAcesso(e.target.value)}
          >
            <option value="">Selecione o nível de acesso</option>
            {niveisAcesso.map(nivel => (
              <option key={nivel.id} value={nivel.id}>
                {nivel.tipo}
              </option>
            ))}
          </select>
          {errors.nivelAcesso && (<div className="invalid-feedback">{errors.nivelAcesso}</div>)}

          </>
        )}

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

      {/* MODAL EXCLUSÃO */}
      <ModalExclusao
        isOpen      ={isOpen}
        mensagem    ="Deseja realmente excluir o usuário?"
        id          ={id}
        nome        ={nome}
        onConfirmar ={confirmDelete}
        onCancelar  ={fecharModal}
      />

    </div>
  )
}

export default CadUsuario