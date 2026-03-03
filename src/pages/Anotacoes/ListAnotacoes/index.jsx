import { useEffect, useState }              from "react"
import { useOutletContext, useNavigate }    from "react-router-dom"
import { getAllAnotacoes }                  from "../../../services/ServiceAnotacoes"
import { useSearch }                        from "../../../hooks/useSearch"
import { useModalVisualizacao }             from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                    from "../../../components/Modals/ModalVisualizacao"
import HeaderAnotacoes                      from "../HeaderAnotacoes"
import TabelaAnotacoes                      from "../TabelaAnotacoes"
import CardAnotacoes                        from "../CardAnotacoes"

const ListAnotacoes = () => {

    const navigate = useNavigate()
    const { setTextoTitle }         = useOutletContext()
    const [anotacoes, setAnotacoes] = useState([])

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
        <div className="ListAnotacoes container-fluid">

            <HeaderAnotacoes
                search={search}
                handleChange={handleChange}
                handleKeyDown={handleKeyDown}
                goCadastrar={goCadastrar}
                isSearching={isSearching}
            />

            {/* Desktop */}
            <div className="d-none d-md-block">
                <TabelaAnotacoes
                    anotacoes={filtrados}
                    abrirModal={abrirModal}
                    goEditar={goEditar}
                    goExcluir={goExcluir}
                    isSearching={isSearching}
                />
            </div>

            {/* Mobile */}
            <div className="d-md-none lista-mobile">
                <CardAnotacoes
                    anotacoes={filtrados}
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
    )
}

export default ListAnotacoes