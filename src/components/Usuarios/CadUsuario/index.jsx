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
} from "react-router-dom"

import { getAllAcessos } from "../../../services/ServiceAcessos"
import { formatarNome } from "../../../utils/formatters"
import { useModalExclusao } from "../../../hooks/useModalExclusao"
import { useCrudMode } from "../../../hooks/useCrudMode"
import ModalExclusao from "../../Modals/ModalExclusao"
import Title from "../../Title"
import "./CadUsuario.css"

const CadUsuario = () => {

  const [nome, setNome]                 = useState("")
  const [email, setEmail]               = useState("")
  const [nivelAcesso, setNivelAcesso]   = useState("")
  const [niveisAcesso, setNiveisAcesso] = useState([])
  const [foto, setFoto]                 = useState(null)


  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const { id } = useParams()
  const navigate = useNavigate()

  const { mode, isCadastrar, isEditar, isDeletar } = useCrudMode("usuarios")

  const {
    isOpen,
    abrirModal,
    fecharModal
  } = useModalExclusao()

  /* ========================
     BUSCA REGISTRO POR ID
  ======================== */

  const allNiveisAcesso = () => {
    getAllAcessos()
      .then(res => {
        setNiveisAcesso(res.data)
      })
      .catch(() => {
        setApiError("Erro ao carregar níveis de acesso.")
      })
  }

  useEffect(() => {
    if (!isDeletar) {
      allNiveisAcesso()
    }
    if (id) {
      getUsuarioById(id)
        .then((res) => {
          setNome(res.data.nome)
          setEmail(res.data.email)
          setUrlFoto(res.data.urlFoto)
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

    if (!nome.trim()) newErrors.nome        = "Informe o nome"
    if (!email.trim()) newErrors.email      = "Informe o email"
    if (!nivelAcesso) newErrors.nivelAcesso = "Selecione o nível de acesso"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0

  }

  /* ========================
     SUBMIT PRINCIPAL
  ======================== */
  const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError("");
  setSuccessMsg("");

  if (!validateForm()) return;

  const formData = new FormData();
  formData.append("nome", nome);
  formData.append("email", email);
  formData.append("senha", "eas1708");
  formData.append("nivelAcessoId", nivelAcesso);

  if (foto) {
    formData.append("foto", foto);
  }

  // DEBUG: verificar FormData
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    if (isCadastrar) {
      await createUsuario(formData);
      setSuccessMsg("Usuário cadastrado com sucesso!");
      setTimeout(voltarParaListagem, 2500);
    }

    if (isEditar && id) {
      await editUsuario(formData, id);
      setSuccessMsg("Usuário atualizado com sucesso!");
      setTimeout(voltarParaListagem, 2500);
    }

    if (isDeletar) {
      abrirModal();
    }

  } catch (err) {
    // Se houver erro de email duplicado ou outro
    setApiError("Erro ao cadastrar/atualizar usuário: " + (err.response?.data?.message || err.message));
    setTimeout(voltarParaListagem, 2500);
  }
};

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
  const tituloPagina = {
    CADASTRAR: "Cadastrar Usuário",
    EDITAR: `Editar Usuário - Id: ${id}`,
    DELETAR: `Excluir Usuário - Id: ${id}`
  }[mode]

  const textoBotao = {
    CADASTRAR: "Salvar",
    EDITAR: "Atualizar",
    DELETAR: "Excluir"
  }[mode]

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
          onBlur={(e) => setNome(formatarNome(e.target.value))}
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

        <div class="my-2">         
          <input 
              class="form-control" 
              type="file"                
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
          />
        </div>

        <div className="d-flex gap-2 mt-3">
          <button
            type="submit"
            className={`btn ${classeBotao} botao`}>
            {textoBotao}
          </button>

          <button
            type="button"
            className="btn btn-secondary botao"
            onClick={voltarParaListagem}
          >
            Voltar
          </button>
        </div>
      </form>

      {/* MODAL EXCLUSÃO */}
      <ModalExclusao
        isOpen={isOpen}
        mensagem="Deseja realmente excluir o usuário e suas anotações?"
        id={id}
        nome={nome}
        onConfirmar={confirmDelete}
        onCancelar={fecharModal}
      />

    </div>
  )
}

export default CadUsuario