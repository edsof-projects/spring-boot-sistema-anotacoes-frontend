// PARA MOBILE

const CardAcessos = ({
    itens = [], 
    abrirModal,
    goEditar,
    goExcluir,
    isSearching
}) => {

    if (itens.length === 0) {
        return (
            <p className="text-center text-muted mt-3">
                {isSearching
                    ? "Nenhum resultado encontrado"
                    : "Nenhuma acesso cadastrado"}
            </p>
        )
    }      

    return (
        <>
            {itens.map(acesso => (
                <div
                    key={acesso.id}
                    className="card mb-3 shadow-sm"
                    onClick={() => abrirModal(acesso)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body w-100">

                        <div className="d-flex justify-content-between border mb-2 py-2 pb-0">

                            <h6 className="fw-bold">
                                {(
                                    acesso.tipo === "ADMIN" ? "ADMINISTRADOR"
                                            : acesso.tipo === "USER" ? "USUARIO" : acesso.tipo   
                                )}
                            </h6>

                            <span className="fw-bold">#{acesso.id}</span>
                        </div>

                        <div className="d-flex gap-2 ">
                            <button
                                className="btn btn-warning btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(acesso.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(acesso.id)
                                }}
                            >
                                Excluir
                            </button>
                        </div>

                    </div>
                </div>
            ))}
        </>
    )
}

export default CardAcessos