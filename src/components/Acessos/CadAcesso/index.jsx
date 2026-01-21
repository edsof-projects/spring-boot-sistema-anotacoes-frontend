import { useEffect, useState } from "react"
import {
  createAcesso,
  editAcesso,
  deleteAcesso,
  getTipoById
} from "../../../services/ServiceAcessos"
import {
  useNavigate,
  useParams,
  useLocation
} from "react-router-dom"
import Title from "../../Title"
import "./CadAcesso.css"

const CadAcesso = () => {
  const [tipo, setTipo] = useState("")
  const [errors, setErrors] = useState({ tipo: "" })
  const [apiError, setApiError] = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  /* =============================
     DEFINE O MODO PELO PATH
  ============================== */
  let mode = "create"
  if (pathname.includes("/editar")) mode = "edit"
  if (pathname.includes("/deletar")) mode = "delete"

  /* =============================
     BUSCA REGISTRO PARA EDIT/DEL
  ============================== */
  useEffect(() => {
    if ((mode === "edit" || mode === "delete") && id) {
      getTipoById(id)
        .then((res) => setTipo(res.data.tipo))
        .catch(() =>
          setApiError("Erro ao carregar o registro.")
        )
    }
  }, [id, mode])

  /* =============================
     VALIDAÇÃO
  ============================== */
  function validateForm() {
    let valid = true
    const copy = { ...errors }

    if (!tipo.trim()) {
      copy.tipo = "Informe o tipo de acesso."
      valid = false
    } else {
      copy.tipo = ""
    }

    setErrors(copy)
    return valid
  }

  /* =============================
     SUBMIT ÚNICO
  ============================== */
  function handleSubmit(e) {
    e.preventDefault()
    setApiError("")
    setSuccessMsg("")

    // DELETE NÃO VALIDA
    if (mode === "delete") {
      const confirmacao = window.confirm(
        "Tem certeza que deseja EXCLUIR este acesso?\nEssa ação não pode ser desfeita."
      )

      if (!confirmacao) return

      deleteAcesso(id)
        .then(() => {
          setSuccessMsg("Acesso excluído com sucesso!")
          setTimeout(() => navigate("/"), 2000)
        })
        .catch(() => {
          setApiError("Erro ao excluir o registro.")
        })

      return
    }


    // CREATE / EDIT VALIDAM
    if (!validateForm()) return

    const payload = { tipo }

    if (mode === "edit") {
      editAcesso(payload, id)
        .then(() => {
          setSuccessMsg("Acesso atualizado com sucesso!")
          setTimeout(() => navigate("/"), 2000)
        })
        .catch(() =>
          setApiError("Erro ao editar o registro.")
        )
    }

    if (mode === "create") {
      createAcesso(payload)
        .then(() => {
          setSuccessMsg("Acesso cadastrado com sucesso!")
          setTipo("")
          setTimeout(() => navigate("/"), 2000)
        })
        .catch((err) => {
          if (err.response?.status === 409) {
            setApiError("Registro duplicado.")
          } else {
            setApiError("Erro ao cadastrar.")
          }
        })
    }
  }

  /* =============================
     RENDER
  ============================== */
  return (
    <div className="cadAcesso">
      <Title
        title={
          mode === "delete"
            ? "Excluir Acesso"
            : mode === "edit"
            ? "Editar Acesso"
            : "Cadastrar Acesso"
        }
        isPrimario
      />

      {successMsg && (
        <div className="alert alert-success">{successMsg}</div>
      )}

      {apiError && (
        <div className="alert alert-danger">{apiError}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control ${errors.tipo ? "is-invalid" : ""}`}
          value={tipo}
          placeholder="Tipo de acesso"
          disabled={mode === "delete"}
          onChange={(e) => setTipo(e.target.value)}
        />
        {errors.tipo && (
          <div className="invalid-feedback">{errors.tipo}</div>
        )}

        <div className="d-flex gap-2 mt-2">
          <button
            type="submit"
            className={`btn ${
              mode === "delete"
                ? "btn-danger"
                : mode === "edit"
                ? "btn-warning"
                : "btn-success"
            }`}
          >
            {mode === "delete"
              ? "Excluir"
              : mode === "edit"
              ? "Salvar Alterações"
              : "Salvar"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
        </div>
      </form>
    </div>
  )
}

export default CadAcesso
