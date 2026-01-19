import { useState }       from "react"
import { getSaveAcesso }  from "../../../services/ServiceAcessos"
import Title              from "../../Title"
import './CadAcesso.css'

const CadAcesso = ({ setCadastrando }) => {

  const [tipo, setTipo]             = useState("")
  const [errors, setErrors]         = useState({ tipo: "" })
  const [apiError, setApiError]     = useState("")
  const [successMsg, setSuccessMsg] = useState("")

  function voltarListagem() {
    setCadastrando(false)
  }

  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }

    if (tipo.trim()) {
      errorsCopy.tipo = ""
    } else {
      errorsCopy.tipo = "Entre com o tipo de acessso para continuar..."
      valid = false
    }
    setErrors(errorsCopy)
    console.log(errorsCopy)

    return valid
  }

  function listAcesso() {
    setCadastrando(false)
  }

  function saveTipoAcesso(e) {
    e.preventDefault()

    setApiError("")
    setSuccessMsg("")

    if (validateForm()) {
      const tipoAcesso = { tipo }

      getSaveAcesso(tipoAcesso)
        .then((response) => {
          setSuccessMsg("Nível de acesso cadastrado com sucesso!")
          setTipo("")
          // opcional: voltar após 2.5s
          setTimeout(() => {
            listAcesso()
          }, 3000)
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setApiError(error.response.data.message)
          } else {
            setApiError("Duplicidade de cadastro [ " + tipo + " ] já esta cadastrado.")
          }
        })
    }
  }

  return (
    <div className="cadAcesso">
      <Title title="Cadastrar Acesso" isPrimario={true} />

      {successMsg && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMsg}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMsg("")}
          />
        </div>
      )}

      {apiError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {apiError}
          <button
            type="button"
            className="btn-close"
            onClick={() => setApiError("")}
          />
        </div>
      )}

      <form>
        <input
          className={`form-control ${errors.tipo ? "is-invalid" : ""}`}
          type="text"
          name="tipo"
          value={tipo}
          placeholder="Tipo de acesso"
          onChange={(e) => setTipo(e.target.value)}
        ></input>
        {errors.tipo && (
          <div className="invalid-feedback">{errors.tipo}</div>
        )}
      </form>

      <div className="d-flex gap-2">
        <button className="btn btn-success mt-2 md-2 px-4" onClick={saveTipoAcesso}>Salvar</button>
        <button className="btn btn-secondary mt-2 me-2 px-4" onClick={voltarListagem}>Cancelar</button>
      </div>

    </div>
  )
}

export default CadAcesso
