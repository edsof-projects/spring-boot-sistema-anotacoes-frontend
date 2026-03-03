import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllTarefas }                    from "../../../services/ServiceTarefas"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import HeaderTarefas                        from "../HeaderTarefas"
import TabelaTarefas                        from "../TabelaTarefas"
import CardTarefas                          from "../CardTarefas"

const ListTarefas = () => {

    const navigate = useNavigate()
    const { setTextoTitle }     = useOutletContext()
    const [tarefas, setTarefas] = useState([])

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

    function goEditar(id) {
        setTextoTitle("Editar tarefa")
        navigate(`editar/${id}`)
    }

    function goExcluir(id) {
        setTextoTitle("Excluir tarefa")
        navigate(`deletar/${id}`)
    }

    return (
        <div className="ListTarefas container-fluid">
            <div className="container-fluid">

                <HeaderTarefas
                    search={search}
                    handleChange={handleChange}
                    handleKeyDown={handleKeyDown}
                    goCadastrar={goCadastrar}
                    isSearching={isSearching}
                />

                {/* Desktop */}
                <div className="d-none d-md-block">
                    <TabelaTarefas
                        tarefas={filtrados}
                        abrirModal={abrirModal}
                        goEditar={goEditar}
                        goExcluir={goExcluir}
                        isSearching={isSearching}
                    />
                </div>

                {/* Mobile */}
                <div className="d-md-none lista-mobile">
                    <CardTarefas
                        tarefas={filtrados}
                        abrirModal={abrirModal}
                        goEditar={goEditar}
                        goExcluir={goExcluir}
                        isSearching={isSearching}
                    />
                </div>

                <ModalVisualizacao
                    isOpen={isOpen}
                    item={itemSelecionado}
                    onClose={fecharModal}
                />
            </div>
        </div>
    )
}

export default ListTarefas