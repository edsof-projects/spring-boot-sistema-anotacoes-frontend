import { format, parseISO }          from "date-fns"
import { limitarTexto, hojeSemHora } from "../../../utils/formatters"

// PARA MOBILE

const CardAnotacoes = ({
    anotacoes,
    abrirModal,
    goEditar,
    goExcluir,
    isSearching
}) => {

    if (anotacoes.length === 0) {
        return (
            <p className="text-center text-muted mt-3">
                {isSearching
                    ? "Nenhum resultado encontrado"
                    : "Nenhuma anotacao cadastrada"}
            </p>
        )
    }

    return (
        <>
            {anotacoes.map(anotacao => (
                <div
                    key={anotacao.id}
                    className="card mb-3 shadow-sm"
                    onClick={() => abrirModal(anotacao)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body w-100">

                        <div className="d-flex justify-content-between">
                            <h6 className="fw-bold">
                                {limitarTexto(anotacao.titulo, 40)}
                            </h6>
                            <small>#{anotacao.id}</small>
                        </div>

                        <p className="mb-2">
                            {limitarTexto(anotacao.descricao, 40)}
                        </p>

                        <small className="text-muted d-block">
                            Autor: {anotacao.nomeUsuario}
                        </small>

                        <small
                            className="d-block mb-3"
                            style={{
                                color:
                                    anotacao.data_prazo &&
                                    parseISO(anotacao.data_prazo) < hojeSemHora()
                                        ? "red"
                                        : "inherit"
                            }}
                        >
                            Prazo: {anotacao.data_prazo
                                ? format(parseISO(anotacao.data_prazo), "dd/MM/yyyy")
                                : "—"}
                        </small>

                        <div className="d-flex gap-2 ">
                            <button
                                className="btn btn-warning btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(anotacao.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(anotacao.id)
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

export default CardAnotacoes