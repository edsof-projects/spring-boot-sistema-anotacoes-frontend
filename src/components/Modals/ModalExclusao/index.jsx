import './ModalExclusao.css'

const ModalExclusao = ({
  isOpen,
  titleHeader = "Confirmar exclusão",
  mensagem,
  id,
  nome,
  onConfirmar,
  onCancelar
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

              {(id || nome) && (
                <div>
                  <div>
                    {id && <p className="txtId">Id : <strong className="text-danger">{id}</strong></p>}
                  </div>
                  <div>
                    {nome && <p className="txtTitulo">Nome : <strong className="text-danger ">{nome}</strong></p>}
                  </div>
                </div>
              )}

            </div>

            <div className="modal-footer">
              <button
                className="btn btn-danger botao"
                onClick={onConfirmar}
              >
                Excluir
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

export default ModalExclusao
