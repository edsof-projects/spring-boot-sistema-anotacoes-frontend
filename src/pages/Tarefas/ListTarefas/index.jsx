import { useEffect, useState }                  from "react"
import { useOutletContext, useNavigate }        from "react-router-dom"
import { getAllTarefas }                        from "../../../services/ServiceTarefas"
import { useSearch }                            from "../../../hooks/useSearch"
import Title                                    from "../../../components/Title"
import { limitarTexto }                         from "../../../utils/formatters"
import { useModalVisualizacao }                 from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                        from "../../../components/Modals/ModalVisualizacao"
import { hojeSemHora }                          from "../../../utils/formatters"
import Menu                                     from "../../../assets/menu.png"
import { format, parseISO }                     from "date-fns";


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
    } = useSearch(tarefas, ["titulo", "historico", "data_prazo"])
       
    useEffect(() => {
        getAllTarefas()     
        .then(res => setTarefas(res.data))
        .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar tarefa")
        navigate("cadastrar")
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
                <div className="menuBurger">
                    <img src={Menu} alt="menu burger" id="menuBurger" />
                </div>

            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="align-middle">Id</th>
                        <th className="align-middle">Título</th>
                        <th className="align-middle">Histórico</th>
                        <th className="align-middle">Autor</th>
                        <th className="align-middle">Prazo</th>
                        <th className="d-flex justify-content-end title-acao">Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {filtrados.length === 0 && (
                        <tr>
                            <td colSpan="6" className="text-center py-3 text-muted">
                            {isSearching
                                ? "Nenhum resultado encontrado"
                                : "Nenhuma tarefa cadastrada"}
                            </td>
                        </tr>
                    )}

                    {filtrados.map((tarefa) => (
                        <tr key={tarefa.id}  onClick={() => abrirModal(tarefa)} style={{ cursor: "pointer" }}>
                           
                            <td className="align-middle" style={{ width: "5%" }}>
                                {tarefa.id}
                            </td>

                            <td className="align-middle" style={{ width: "30%" }}>
                                {limitarTexto(tarefa.titulo, 45)}
                            </td>

                            <td className="align-middle" style={{ width: "30%" }}>
                                {limitarTexto(tarefa.historico, 60)}
                            </td>

                            <td className="align-middle" style={{ width: "25%" }}>
                                {limitarTexto(tarefa.nomeUsuario, 20)}
                            </td>                            

                            <td
                                className="align-middle"
                                style={{
                                    width: "10%",
                                    color:
                                    tarefa.data_prazo && parseISO(tarefa.data_prazo) < hojeSemHora()
                                        ? "red"
                                        : "inherit"
                                }}
                                >
                                {tarefa.data_prazo
                                    ? format(parseISO(tarefa.data_prazo), "dd/MM/yyyy")
                                    : ""}
                            </td>

                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn btn-warning px-3"
                                        onClick={() => {
                                            setTextoTitle("Editar tarefa")
                                            navigate(`editar/${tarefa.id}`)                                            
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger px-3"
                                        onClick={() => {
                                            setTextoTitle("Excluir tarefa")
                                            navigate(`deletar/${tarefa.id}`)
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
