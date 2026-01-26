import { useEffect, useState }                  from "react"
import { useOutletContext, useNavigate }        from "react-router-dom"
import { getAllAnotacoes }                      from "../../../services/ServiceAnotacoes"
import { useSearch }                            from "../../../hooks/useSearch"
import Title                                    from "../../Title"
import { limitarTexto }                         from "../../../utils/formatters"
import { useModalVisualizacao }                 from "../../../hooks/useModalVisualizacao"
import ModalVisualizacao                        from "../../Modals/ModalVisualizacao"
import './ListAnotacoes.css'

const ListAnotacoes = () => {

    const navigate                                      = useNavigate()
    const [anotacoes, setAnotacoes]                     = useState([])
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
    } = useSearch(anotacoes, ["titulo", "descricao"])
       
    useEffect(() => {
        getAllAnotacoes()     
        .then(res => setAnotacoes(res.data))
        .catch(console.error)
    }, [])

    function goCadastrar() {
        setTextoTitle("Cadastrar anotação")
        navigate("/anotacoes/cadastrar")
    }       
  
    return (
        <div className="ListAnotacoes">
            <div className="d-flex justify-content-between align-items-center border px-2 mb-1">
                <div className="col-md-4">
                    <input
                        type="text"
                        className="search form-control py-2 px-3 rounded-5 fs-6"
                        aria-label="Pesquisar anotações"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <div className="col-md-4 text-center">
                    <Title title="Anotações" isPrimario={true} />
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
                        <th className="align-middle">Descrição</th>
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
                                : "Nenhuma anotação cadastrada"}
                            </td>
                        </tr>
                    )}

                    {filtrados.map((anotacao) => (
                        <tr key={anotacao.id}  onClick={() => abrirModal(anotacao)} style={{ cursor: "pointer" }}>
                            <td className="align-middle">{anotacao.id}</td>
                            
                            <td className="align-middle">
                                {limitarTexto(anotacao.titulo, 45)}                               
                            </td>                                                                              
                            
                            <td className="align-middle">                               
                                {limitarTexto(anotacao.descricao, 70)}
                            </td>

                            <td className="align-middle">
                                {limitarTexto(anotacao.nomeUsuario, 20)}
                            </td>

                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button
                                        className="btn btn-warning px-3"
                                        onClick={() => {
                                            setTextoTitle("Editar anotação")
                                            navigate(`/anotacoes/editar/${anotacao.id}`)
                                        }}>
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger px-3"
                                        onClick={() => {
                                            setTextoTitle("Excluir anotação")
                                            navigate(`/anotacoes/deletar/${anotacao.id}`)
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

export default ListAnotacoes
