import './ModalConfirmacao.css'

const ModalConfirmacao = ({
  isOpen,
  titleHeader = "Confirmar ação referente a esta tarefa!",
  mensagem,
  id,
  historico,
  onConfirmar,
  onCancelar, 
  textoConfirmar,
}) => {
  if (!isOpen) return null

  return (
    <>
      <div className="modal fade show d-block modal-fullscreen" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-4 rounded-2">

            <div className="modal-header">
              <h5 className="modal-title text-danger">
                {titleHeader}
              </h5>
            </div>

            <div className="modal-body areaDados">
              <p className="text-center">{mensagem}</p>

              {(id || historico) && (
                <div>
                  <div>
                    {id && <p className="txtId">Id : <strong className="text-danger">{id}</strong></p>}
                  </div>
                  <div>
                    {historico && <p className="txtHistorico">Historico : <strong className="text-danger ">{historico}</strong></p>}
                  </div>
                </div>
              )}

            </div>

            <div className="modal-footer">
              <button
                className={`btn ${textoConfirmar && "btn-success"} botao`}
                onClick={onConfirmar}
              >
                {textoConfirmar || "Confirmar"}
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

export default ModalConfirmacao
