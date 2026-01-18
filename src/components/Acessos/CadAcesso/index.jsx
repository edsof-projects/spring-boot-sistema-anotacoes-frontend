import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Title from "../../Title"
import { getSaveAcesso } from "../../../services/ServiceAcessos"

const CadAcesso = ({ setCadastrando }) => {

  const [tipo, setTipo]       = useState("")
  const [errors, setErrors]   = useState({tipo : ""})
  const navigator             = useNavigate()


  function voltarListagem(){
     setCadastrando(false)
  }

  function validateForm(){
    let valid = true
    const errorsCopy = {... errors}

    if(tipo.trim()){
      errorsCopy.tipo = ""
    }else{
      errorsCopy.tipo = "Nome do tipo de acessso é obrigatório"
      valid = false
    }
  }

  function listAcesso(){
        setCadastrando(false)
    }

  function saveTipoAcesso(e){
    e.preventDefault()

    const tipoAcesso = {
      tipo
    }

    console.log(tipoAcesso)
    getSaveAcesso(tipoAcesso)
    .then((response) =>{
      console.log(response.data)
      listAcesso()
    })
  }

  return (
    <div>
       <Title title="Cadastrar Acesso" isPrimario={true} />
       <form>        
          <input 
              className={`form-control ${errors.tipo ? "is-invalid" : ""}`}               
              type="text" 
              name="tipo" 
              value={tipo}
              placeholder="Tipo de acesso" 
              onChange={(e) => setTipo(e.target.value)}          
          ></input> 
          {errors.tipo &&(
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
