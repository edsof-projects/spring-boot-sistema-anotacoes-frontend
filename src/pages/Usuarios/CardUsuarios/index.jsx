import { limitarTexto } from "../../../utils/formatters"

// PARA MOBILE

const CardUsuarios = ({
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
                    : "Nenhuma usuario cadastrado"}
            </p>
        )
    }

    return (
        <>
            {itens.map(usuario => (
                <div
                    key={usuario.id}
                    className="card mb-3 shadow-sm"
                    onClick={() => abrirModal(usuario)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body w-100">

                        <div className="d-flex justify-content-between border mb-2 py-2 pb-0">
                            <h6 className="fw-bold">
                                {limitarTexto(usuario.nome, 40)}
                            </h6>
                            <span className="fw-bold">#{usuario.id}</span>
                        </div>

                        <p className="mb-2">
                            Email : {limitarTexto(usuario.email, 40)}
                        </p>

                        <p className="mb-2">
                            Acesso : {limitarTexto(usuario.acesso === "ADMIN" ? "ADMINISTRADOR" : "USUARIO", 40)}
                        </p>

                        <div className="d-flex gap-2 ">
                            <button
                                className="btn btn-warning btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(usuario.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(usuario.id)
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

export default CardUsuarios