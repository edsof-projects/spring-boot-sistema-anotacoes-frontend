import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllUsuarios }                   from "../../../services/ServiceUsuarios"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import TabelaUsuarios                       from "../TabelaUsuarios"
import CardUsuarios                         from "../CardUsuarios"
import ListPage                             from "../../../components/ListPage"
import HeaderPage                           from "../../../components/HeaderPage"

const ListUsuarios = () => {

    const navigate = useNavigate()
    const [usuarios, setUsuarios]        = useState([])
    const [totalregs, setTotalRegs]      = useState()
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
    } = useSearch(usuarios, ["nome", "email"])

    useEffect(() => {
        getAllUsuarios()
            .then(
                res => 
                    {
                        setUsuarios(res.data)        
                        setTotalRegs(res.data.length)
                    }                        
            )
            .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar usuario")
        navigate("cadastrar")
    }

    function goEditar(id) {
        setTextoTitle("Editar usuario")
        navigate(`editar/${id}`)
    }

    function goExcluir(id) {
        setTextoTitle("Excluir usuario")
        navigate(`deletar/${id}`)
    }

    return (
        <div className="container-fluid">
            <ListPage
                entity          = "Usuarios"
                search          = {search}
                handleChange    = {handleChange}
                handleKeyDown   = {handleKeyDown}
                goCadastrar     = {goCadastrar}
                isSearching     = {isSearching}
                data            = {filtrados}

                HeaderComponent = {HeaderPage}
                TableComponent  = {TabelaUsuarios}
                CardComponent   = {CardUsuarios}

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
            <div className="totalreg" style={{display: "flex", justifyContent: "flex-end", marginRight : 20}}>
                <span>Total de registros: {isSearching ? filtrados.length : usuarios.length}</span>
            </div>
        </div>
    )
}

export default ListUsuarios