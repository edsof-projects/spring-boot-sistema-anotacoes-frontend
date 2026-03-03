import { format, parseISO }          from "date-fns"
import { limitarTexto, hojeSemHora } from "../../../utils/formatters"

// PARA DESKTOP

const TabelaTarefas = ({
    tarefas,
    abrirModal,
    goEditar,
    goExcluir,
    isSearching
}) => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Título</th>
                    <th>Histórico</th>
                    <th>Autor</th>
                    <th>Prazo</th>
                    <th className="text-end px-5">Ações</th>
                </tr>
            </thead>

            <tbody>

                {tarefas.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma tarefa cadastrada"}
                        </td>
                    </tr>
                )}

                {tarefas.map(tarefa => (
                    <tr
                        key={tarefa.id}
                        onClick={() => abrirModal(tarefa)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{tarefa.id}</td>
                        <td>{limitarTexto(tarefa.titulo, 45)}</td>
                        <td>{limitarTexto(tarefa.historico, 60)}</td>
                        <td>{limitarTexto(tarefa.nomeUsuario, 20)}</td>

                        <td
                            style={{
                                color:
                                    tarefa.data_prazo &&
                                    parseISO(tarefa.data_prazo) < hojeSemHora()
                                        ? "red"
                                        : "inherit"
                            }}
                        >
                            {tarefa.data_prazo
                                ? format(parseISO(tarefa.data_prazo), "dd/MM/yyyy")
                                : ""}
                        </td>

                        <td className="text-end">
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(tarefa.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(tarefa.id)
                                }}
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TabelaTarefas