import { format, parseISO }          from "date-fns"
import { limitarTexto, hojeSemHora } from "../../../utils/formatters"

// PARA MOBILE

const CardTarefas = ({
    tarefas,
    abrirModal,
    goEditar,
    goExcluir,
    isSearching
}) => {

    if (tarefas.length === 0) {
        return (
            <p className="text-center text-muted mt-3">
                {isSearching
                    ? "Nenhum resultado encontrado"
                    : "Nenhuma tarefa cadastrada"}
            </p>
        )
    }

    return (
        <>
            {tarefas.map(tarefa => (
                <div
                    key={tarefa.id}
                    className="card mb-3 shadow-sm"
                    onClick={() => abrirModal(tarefa)}
                    style={{ cursor: "pointer" }}
                >
                    <div className="card-body w-100">

                        <div className="d-flex justify-content-between">
                            <h6 className="fw-bold">
                                {limitarTexto(tarefa.titulo, 40)}
                            </h6>
                            <small>#{tarefa.id}</small>
                        </div>

                        <p className="mb-2">
                            {limitarTexto(tarefa.historico, 80)}
                        </p>

                        <small className="text-muted d-block">
                            Autor: {tarefa.nomeUsuario}
                        </small>

                        <small
                            className="d-block mb-3"
                            style={{
                                color:
                                    tarefa.data_prazo &&
                                    parseISO(tarefa.data_prazo) < hojeSemHora()
                                        ? "red"
                                        : "inherit"
                            }}
                        >
                            Prazo: {tarefa.data_prazo
                                ? format(parseISO(tarefa.data_prazo), "dd/MM/yyyy")
                                : "—"}
                        </small>

                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-warning btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(tarefa.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(tarefa.id)
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

export default CardTarefas