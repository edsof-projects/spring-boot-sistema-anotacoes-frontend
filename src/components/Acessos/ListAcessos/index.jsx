import { useEffect, useState }  from "react"
import { getAllAcessos }        from "../../../services/ServiceAcessos"
import Title                    from "../../Title"

const ListAcessos = ({ setCadastrando }) => {

    const [acessos, setAcessos] = useState([])    
    
    function listOfAcessos(){
        getAllAcessos()
        .then((response) =>{
            console.log(response.data)
            setAcessos(response.data)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    useEffect(() => {
        listOfAcessos()
    },[])

    function cadAcesso(){
        setCadastrando(true)
    }

    return (
        <div className="acessos">
            <div className="d-flex justify-content-between align-items-center">
                <Title title="Acessos" isPrimario={true} />
                <button className="btn btn-success" onClick={cadAcesso}>Cadastrar</button>
            </div>
            <hr />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className="align-middle">Id</th>
                        <th className="align-middle">Tipo de Acesso</th>
                        <th className="d-flex justify-content-end pe-5">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {acessos.map((acesso) =>(
                    <tr key={acesso.id}>
                        <td className="align-middle">{acesso.id}</td>
                        <td className="align-middle">{acesso.tipo}</td>
                        <td className="align-middle">
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-warning">Editar</button>
                                <button className="btn btn-danger">Excluir</button>
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
