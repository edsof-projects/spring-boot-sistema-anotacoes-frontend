import { useEffect, useState }                  from "react"
import { useOutletContext, useNavigate }        from "react-router-dom"
import { getAllTarefas }                        from "../../../services/ServiceTarefas"
import { useSearch }                            from "../../../hooks/useSearch"
import Title                                    from "../../Title"
import { limitarTexto }                         from "../../../utils/formatters"
import { useModalVisualizacao }                 from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                        from "../../Modals/ModalVisualizacao"
import './ListTarefas.css'

const ListTarefas = () => {

    const navigate                                      = useNavigate()
    const [tarefas, setTarefas]                         = useState([])
    const { setTextoTitle }                             = useOutletContext()

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
    } = useSearch(tarefas, ["titulo", "historico"])
       
    useEffect(() => {
        getAllTarefas()     
        .then(res => setTarefas(res.data))
        .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar tarefa")
        navigate("/tarefas/cadastrar")
    }       
  
    return (
        <div className="ListTarefas">
            <div className="d-flex justify-content-between align-items-center border px-2 mb-1">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="search form-control py-2 px-3 rounded-5 fs-6"
                        aria-label="Pesquisar tarefas"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="col-md-4 text-center">
                    <Title title="Tarefas" isPrimario={true} />
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
                        <th className="align-middle">Título</th>
                        <th className="align-middle">Histórico</th>
                        <th className="align-middle">Cadastrado Por:</th>
                        <th className="d-flex justify-content-end pe-5">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrados.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma tarefa cadastrada"}
                            </td>
                        </tr>
                    )}

                    {filtrados.map((tarefa) => (
                        <tr key={tarefa.id}  onClick={() => abrirModal(tarefa)} style={{ cursor: "pointer" }}>
                            <td className="align-middle">{tarefa.id}</td>
                            
                            <td className="align-middle">
                                {limitarTexto(tarefa.titulo, 45)}                               
                            </td>                                                                              
                            
                            <td className="align-middle">                               
                                {limitarTexto(tarefa.historico, 70)}
                            </td>

                            <td className="align-middle">
                                {limitarTexto(tarefa.nomeUsuario, 20)}
                            </td>

                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn btn-warning px-3"
                                        onClick={() => {
                                            setTextoTitle("Editar tarefa")
                                            navigate(`/tarefas/editar/${tarefa.id}`)
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger px-3"
                                        onClick={() => {
                                            setTextoTitle("Excluir tarefa")
                                            navigate(`/tarefas/deletar/${tarefa.id}`)
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

export default ListTarefas
