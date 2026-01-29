import { useEffect, useState }              from "react"
import { getAllUsuarios }                   from "../../../services/ServiceUsuarios"
import { useSearch }                        from "../../../hooks/useSearch"
import Title                                from "../../Title"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { useModalVisualizacao }                 from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                        from "../../Modals/ModalVisualizacao"

import './ListUsuarios.css'

const ListUsuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const { setTextoTitle }       = useOutletContext()
    const navigate                = useNavigate()

    const {
        isOpen,
        itemSelecionado,
        abrirModal,
        fecharModal
    } = useModalVisualizacao()

    const {
        search,
        filtrados,
        handleChange,
        handleKeyDown,
        isSearching
    } = useSearch(usuarios, ["nome", "email"])
       
    useEffect(() => {
        getAllUsuarios()     
        .then(res => setUsuarios(res.data))
        .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar usuario")
        navigate("/usuarios/cadastrar")
    }    
  
    return (
        <div className="ListUsuarios">
            <div className="d-flex justify-content-between align-items-center border px-2 mb-1">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="search form-control py-2 px-3 rounded-5 fs-6"
                        aria-label="Pesquisar usuários"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="col-md-4 text-center">
                    <Title title="usuarios" isPrimario={true} />
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
                        <th className="align-middle">Nome</th>
                        <th className="align-middle">Email</th>
                        <th className="align-middle">Acesso</th>
                        <th className="d-flex justify-content-end pe-5">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhum usuário cadastrado"}
                            </td>
                        </tr>
                    )}

                    {filtrados.map((usuario) => (
                        <tr key={usuario.id} onClick={() => abrirModal(usuario)} style={{ cursor: "pointer" }}>
                            <td className="align-middle">{usuario.id}</td>
                            <td className="align-middle">{usuario.nome}</td>
                            <td className="align-middle">{usuario.email}</td>
                            <td className="align-middle">{usuario.acesso}</td>

                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn btn-warning px-3"
                                        onClick={() => {
                                            setTextoTitle("Editar usuario")
                                            navigate(`/usuarios/editar/${usuario.id}`)
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger px-3"
                                        onClick={() => {
                                            setTextoTitle("Excluir usuario")
                                            navigate(`/usuarios/deletar/${usuario.id}`)
                                        }}>
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

           {/* MODAL VISUALIZACAO */}
           <ModalVisualizacao
                isOpen  ={isOpen}
                item    ={itemSelecionado}
                onClose ={fecharModal}
           />

        </div>
    )
}

export default ListUsuarios
