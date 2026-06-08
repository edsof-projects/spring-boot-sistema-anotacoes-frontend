import './ModalAlteraFoto.css'

const ModalAlteraFoto = ({
  isOpen,
  titleHeader = "PERSONALIZE SUA FOTO",  
  onConfirmar,
  onCancelar,
  setFoto,
  setPreview,
  preview
}) => {
  if (!isOpen) return null

  return (
    <>
      <div className="modal fade show d-block modal-fullscreen" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-5 rounded-2">

            <div className="modal-header">
              <h5 className="modal-title txtTitulo">
                {titleHeader}
              </h5>
            </div>

            <div className="modal-body areaDados">
              { 
              <div className="my-2">         
                <input 
                    className="form-control" 
                    type="file"                
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFoto(file);                          // mantém o File para enviar no FormData
                      setPreview(URL.createObjectURL(file));  // cria URL temporária para mostrar no <img>
                    }}              
                />
                { preview && 
                  <div className="d-flex justify-content-center">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="mt-3 img-fluid rounded" 
                      width="180"
                    />
                  </div>
                }
            </div>
              }

            </div>

            <div className="modal-footer d-flex justify-content-between">
              <button
                className="btn btn-success botao"
                onClick={onConfirmar}
              >
                Salvar
              </button>

              <button
                className="btn btn-secondary botao"
                onClick={onCancelar}
              >
                Cancelar
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show modal-fullscreen"></div>
    </>
  )
}

export default ModalAlteraFoto
