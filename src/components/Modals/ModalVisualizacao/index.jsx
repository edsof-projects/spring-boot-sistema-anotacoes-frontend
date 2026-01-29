const ModalVisualizacao = ({
  isOpen,
  item,
  onClose
}) => {
  if (!isOpen || !item) return null

  // 🔹 Texto dinâmico (prioridade) - Aqui voce decide qual campo sera mostrado alem do id
  const textoExibido =
    item.historico ||
    item.descricao ||
    "Nenhuma informação disponível"

  return (
    <>
      <div className="modal fade show d-block modal-fullscreen" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-2">

            <div className="modal-header">
              <h5 className="modal-title">
                {item.titulo}
              </h5>
            </div>

            <div className="modal-body">
              <p
                className="txtDescricao"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {textoExibido}
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={onClose}
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show modal-fullscreen"></div>
    </>
  )
}

export default ModalVisualizacao
