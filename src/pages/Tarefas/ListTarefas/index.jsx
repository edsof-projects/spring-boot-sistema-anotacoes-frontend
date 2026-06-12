import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllTarefas }                    from "../../../services/ServiceTarefas"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import TabelaTarefas                        from "../TabelaTarefas"
import CardTarefas                          from "../CardTarefas"
import ListPage                             from "../../../components/ListPage"
import HeaderPage                           from "../../../components/HeaderPage"

const ListTarefas = () => {

    const navigate = useNavigate()
    const [tarefas, setTarefas]          = useState([])
    const {
        setTextoTitle,
        onMenuClick,
        voltarHomeMobile
    } = useOutletContext();

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
        <div className="container-fluid">
            <ListPage
                entity          = "Tarefas"
                search          = {search}
                handleChange    = {handleChange}
                handleKeyDown   = {handleKeyDown}
                goCadastrar     = {goCadastrar}
                isSearching     = {isSearching}
                data            = {filtrados}

                HeaderComponent = {HeaderPage}
                TableComponent  = {TabelaTarefas}
                CardComponent   = {CardTarefas}

                abrirModal      = {abrirModal}
                goEditar        = {goEditar}
                goExcluir       = {goExcluir}
                onMenuClick     = {onMenuClick}
                voltarHomeMobile = {voltarHomeMobile}

                modal={
                <ModalVisualizacao
                    isOpen      = {isOpen}
                    item        = {itemSelecionado}
                    onClose     = {fecharModal}
                />
                }
            />
            <div className="totalreg" style={{display: "flex", justifyContent: "flex-end", marginRight : 20}}>
                <span>Total de registros: {isSearching ? filtrados.length : tarefas.length}</span>
            </div>
        </div>
    )
}

export default ListTarefas