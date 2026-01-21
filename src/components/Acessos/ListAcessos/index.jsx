import { useEffect, useState }           from "react"
import { getAllAcessos }                 from "../../../services/ServiceAcessos"
import Title                             from "../../Title"
import { useOutletContext, useNavigate } from "react-router-dom"
import './ListAcessos.css'

const ListAcessos = () => {

    const [acessos, setAcessos] = useState([])
    const { setTextoTitle }     = useOutletContext()
    const navigate              = useNavigate()

    function listOfAcessos() {
        getAllAcessos()
            .then((response) => {
                setAcessos(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    useEffect(() => {
        listOfAcessos()
    }, [])
   
    return (
        <div className="ListAcessos">
            <div className="d-flex justify-content-between align-items-center border px-2 mb-1">
                <Title title="Acessos" isPrimario={true} />
                <button 
                    className="btn btn-success" 
                    onClick={() => {
                    setTextoTitle("Cadastrar Acesso")
                    navigate(`/acessos/cadastrar`)
                    }}>
                    Cadastrar
                </button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="align-middle">Id</th>
                        <th className="align-middle">Tipo de Acesso</th>
                        <th className="d-flex justify-content-end pe-5">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {acessos.map((acesso) => (
                        <tr key={acesso.id}>
                            <td className="align-middle">{acesso.id}</td>
                            <td className="align-middle">{acesso.tipo}</td>
                            <td className="align-middle">
                                <div className="d-flex justify-content-end gap-2">
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={() => {
                                        setTextoTitle("Editar Acesso")
                                        navigate(`/acessos/editar/${acesso.id}`)
                                        }}>
                                        Editar
                                    </button>
                                    <button 
                                        className="btn btn-danger"
                                        onClick={() => {
                                        setTextoTitle("Excluir Acesso")
                                        navigate(`/acessos/deletar/${acesso.id}`)
                                        }}>
                                        Excluir
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListAcessos
