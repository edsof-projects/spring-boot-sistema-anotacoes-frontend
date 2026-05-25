import { limitarTexto } from "../../../utils/formatters"

// PARA DESKTOP

const TabelaUsuarios = ({
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
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Acesso</th>
                    <th className="text-end px-5">Ações</th>
                </tr>
            </thead>

            <tbody>

                {itens.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma usuario cadastrado"}
                        </td>
                    </tr>
                )}

                {itens.map(usuario => (
                    <tr
                        key={usuario.id}
                        onClick={() => abrirModal(usuario)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{usuario.id}</td>
                        <td>{limitarTexto(usuario.nome, 45)}</td>
                        <td>{limitarTexto(usuario.email, 60)}</td>
                        <td>{limitarTexto(usuario.acesso === "ADMIN" ? "ADMINISTRADOR" : "USUARIO", 20)}</td>                       

                        <td className="text-end">
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goEditar(usuario.id)                                    
                                }}
                            >
                                Editar
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    goExcluir(usuario.id)
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

export default TabelaUsuarios