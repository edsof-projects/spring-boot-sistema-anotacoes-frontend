import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllAcessos }                    from "../../../services/ServiceAcessos"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import TabelaAcessos                        from "../TabelaAcessos"
import CardAcessos                          from "../CardAcessos"
import ListPage                             from "../../../components/ListPage"
import HeaderPage                           from "../../../components/HeaderPage"


const ListAcessos = () => {

    const navigate = useNavigate()
    const [acessos, setAcessos]          = useState([])
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
    } = useSearch(acessos, ["tipo"])

    useEffect(() => {
        getAllAcessos()
            .then(res => setAcessos(res.data))
            .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar acesso")
        navigate("cadastrar")
    }

    function goEditar(id) {
        setTextoTitle("Editar acesso")
        navigate(`editar/${id}`)
    }

    function goExcluir(id) {
        setTextoTitle("Excluir acesso")
        navigate(`deletar/${id}`)
    }
    
    return (
        <div className="container-fluid">
            <ListPage
                entity          = "Acessos"
                search          = {search}
                handleChange    = {handleChange}
                handleKeyDown   = {handleKeyDown}
                goCadastrar     = {goCadastrar}
                isSearching     = {isSearching}
                data            = {filtrados}

                HeaderComponent = {HeaderPage}
                TableComponent  = {TabelaAcessos}
                CardComponent   = {CardAcessos}

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

export default ListAcessos