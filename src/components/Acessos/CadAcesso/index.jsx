import Title from "../../Title"

const CadAcesso = ({ setCadastrando }) => {

  function voltarListagem(){
     setCadastrando(false)
  }

  return (
    <div>
       <Title title="Cadastrar Acesso" isPrimario={true} />
       <input className="form-control" type="text" placeholder="Tipo de acesso" />   
       <div className="d-flex gap-2"> 
          <button className="btn btn-success mt-2 md-2">Cadastrar</button>    
          <button className="btn btn-secondary mt-2 me-2 px-4" onClick={voltarListagem}>Cancelar</button>    
       </div>
    </div>
  )
}

export default CadAcesso
