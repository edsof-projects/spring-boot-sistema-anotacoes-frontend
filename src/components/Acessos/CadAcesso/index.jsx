import { useEffect, useState }                     from "react"
import { createAcesso, editAcesso }                from "../../../services/ServiceAcessos"
import { getTipoById }                             from "../../../services/ServiceAcessos"
import { useOutletContext,useNavigate, useParams } from "react-router-dom"
import Title                                       from "../../Title"
import './CadAcesso.css'

const CadAcesso = () => {

  const [tipo, setTipo]             = useState("")
  const [errors, setErrors]         = useState({ tipo: "" })
  const [apiError, setApiError]     = useState("")
  const [successMsg, setSuccessMsg] = useState("")
  const {id}                        = useParams()
  const isEdicao                    = Boolean(id)
  const { textoTitle }              = useOutletContext()
  const navigate                    = useNavigate()

  useEffect(()=>{
     if(id){
      getTipoById(id)
      .then((response)=>{
        console.log(response.data)
        setTipo(response.data.tipo)
      }).catch((error)=>{
        console.error(error)
      })
     }
  },[id])

  function voltarParaListagem() {
    navigate("/")
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

    return valid
  }
  
  function saveOrEditTipo(e) {
    e.preventDefault()

    setApiError("")
    setSuccessMsg("")

    if (validateForm()) {
      const tipoAcesso = { tipo }

      if(id){
        editAcesso(tipoAcesso, id)
        .then((response) => {
          setSuccessMsg("Nível de acesso editado com sucesso!")
          setTipo("")
          // opcional: voltar após 2.5s
          setTimeout(() => {
            voltarParaListagem()
          }, 3000)
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setApiError(error.response.data.message)
          } else {
            setApiError("Erro ao tentar editar, talvez o acesso já esteja cadastrado.")
          }
          setTimeout(() => {
            voltarParaListagem()
          }, 3000)
        })
      }else{
         createAcesso(tipoAcesso)
        .then((response) => {
          setSuccessMsg("Nível de acesso cadastrado com sucesso!")
          setTipo("")
          // opcional: voltar após 2.5s
          setTimeout(() => {
            voltarParaListagem()
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
  } 

  return (
    <div className="cadAcesso">
      <Title title={textoTitle} isPrimario={true} />

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
        <button className="btn btn-success mt-2 md-2 px-4" onClick={ saveOrEditTipo }>Salvar</button>
        <button className="btn btn-secondary mt-2 me-2 px-4" onClick={voltarParaListagem}>Voltar</button>
      </div>

    </div>
  )
}

export default CadAcesso
