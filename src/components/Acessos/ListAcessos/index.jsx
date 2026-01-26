import { useEffect, useState }              from "react"
import { getAllAcessos }                    from "../../../services/ServiceAcessos"
import { useSearch }                        from "../../../hooks/useSearch"
import Title                                from "../../Title"
import { useOutletContext, useNavigate }    from "react-router-dom"
import './ListAcessos.css'

const ListAcessos = () => {

    const [acessos, setAcessos] = useState([])
    const { setTextoTitle }     = useOutletContext()
    const navigate              = useNavigate()
    const {
        search,
        filtrados,
        handleChange,
        handleKeyDown,
        isSearching
    } = useSearch(acessos, ["tipo"])
           
   useEffect(() => {
        getAllAcessos()
        .then(res => setAcessos(res.data))
        .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar Acesso")
        navigate(`/acessos/cadastrar`)
    }  
  
    return (
        <div className="ListAcessos">
            <div className="d-flex justify-content-between align-items-center border px-2 mb-1">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="search form-control py-2 px-3 rounded-5 fs-6"
                        aria-label="Pesquisar acessos"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="col-md-4 text-center">
                    <Title title="Acessos" isPrimario={true} />
                </div>
                <div className="col-md-4  d-flex justify-content-end">
                    <button
                        className="btn btn-success px-5 md-3"  
                        disabled={isSearching}   
                        type="button"                  
                        onClick={goCadastrar}>
                        Cadastrar
                    </button>
                </div>

            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="align-middle">Id</th>
                        <th className="align-middle">Tipo de Acesso</th>
                        <th className="d-flex justify-content-end pe-5">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhum tipo de acesso cadastrado"}
                            </td>
                        </tr>
                    )}
                    {filtrados.map((acesso) => (
                        <tr key={acesso.id}>
                            <td className="align-middle">{acesso.id}</td>
                            <td className="align-middle">{acesso.tipo}</td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn btn-warning px-3"
                                        onClick={() => {
                                            setTextoTitle("Editar Acesso")
                                            navigate(`/acessos/editar/${acesso.id}`)
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger px-3"
                                        onClick={() => {
                                            setTextoTitle("Excluir Acesso")
                                            navigate(`/acessos/deletar/${acesso.id}`)
                                        }}>
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListAcessos
