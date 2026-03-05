import { limitarTexto } from "../../../utils/formatters"

// PARA DESKTOP

const TabelaAcessos = ({    
    itens = [], 
    abrirModal,
    goEditar,
    goExcluir,
    isSearching,
}) => {

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Tipo</th>
                    <th className="text-end px-5">Ações</th>
                </tr>
            </thead>

            <tbody>

                {itens.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma acesso cadastrado"}
                        </td>
                    </tr>
                )}

                {itens.map(acesso => (
                    <tr
                        key={acesso.id}
                        onClick={() => abrirModal(acesso)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{acesso.id}</td>
                        <td>
                            {limitarTexto(
                                acesso.tipo === "ADMIN" ? "ADMINISTRADOR"
                                            : acesso.tipo === "USER" ? "USUARIO" : acesso.tipo,   
                                45
                            )}
                        </td>

                        <td className="text-end">
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(acesso.id)
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(acesso.id)
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

export default TabelaAcessos