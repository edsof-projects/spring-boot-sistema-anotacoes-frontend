import { limitarTexto } from "../../../utils/formatters"

// PARA DESKTOP

const TabelaAnotacoes = ({
    itens = [], 
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
                    <th>Descrição</th>
                    <th>Autor</th>
                    <th className="text-end px-5">Ações</th>
                </tr>
            </thead>

            <tbody>

                {itens.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma anotacao cadastrada"}
                        </td>
                    </tr>
                )}

                {itens.map(anotacao => (
                    <tr
                        key={anotacao.id}
                        onClick={() => abrirModal(anotacao)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{anotacao.id}</td>
                        <td>{limitarTexto(anotacao.titulo, 45)}</td>
                        <td>{limitarTexto(anotacao.descricao, 60)}</td>
                        <td>{limitarTexto(anotacao.nomeUsuario, 20)}</td>                       

                        <td className="text-end">
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(anotacao.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(anotacao.id)
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

export default TabelaAnotacoes