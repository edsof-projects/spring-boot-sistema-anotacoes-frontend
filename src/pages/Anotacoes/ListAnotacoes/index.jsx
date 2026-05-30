import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllAnotacoes }                  from "../../../services/ServiceAnotacoes"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import TabelaAnotacoes                      from "../TabelaAnotacoes"
import CardAnotacoes                        from "../CardAnotacoes"
import ListPage                             from "../../../components/ListPage"
import HeaderPage                           from "../../../components/HeaderPage"

const ListAnotacoes = () => {

    const navigate = useNavigate()
    const [anotacoes, setAnotacoes]      = useState([])
    const { setTextoTitle, onMenuClick } = useOutletContext();

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
    } = useSearch(anotacoes, ["titulo", "descricao"])

    useEffect(() => {
        getAllAnotacoes()
            .then(res => setAnotacoes(res.data))
            .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar anotacao")
        navigate("cadastrar")
    }

    function goEditar(id) {
        setTextoTitle("Editar anotacao")
        navigate(`editar/${id}`)
    }

    function goExcluir(id) {
        setTextoTitle("Excluir anotacao")
        navigate(`deletar/${id}`)
    }

   return (
        <div className="container-fluid">
            <ListPage
                entity          = "Anotacoes"
                search          = {search}
                handleChange    = {handleChange}
                handleKeyDown   = {handleKeyDown}
                goCadastrar     = {goCadastrar}
                isSearching     = {isSearching}
                data            = {filtrados}

                HeaderComponent = {HeaderPage}
                TableComponent  = {TabelaAnotacoes}
                CardComponent   = {CardAnotacoes}

                abrirModal      = {abrirModal}
                goEditar        = {goEditar}
                goExcluir       = {goExcluir}
                onMenuClick     = {onMenuClick}

                modal={
                <ModalVisualizacao
                    isOpen      = {isOpen}
                    item        = {itemSelecionado}
                    onClose     = {fecharModal}
                />
                }
            />
        </div>
    )
}

export default ListAnotacoes