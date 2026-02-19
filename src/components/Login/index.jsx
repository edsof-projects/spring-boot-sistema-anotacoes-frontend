import { useNavigate }    from "react-router-dom"
import './Login.css'

const Login = () =>{

    const navigate  = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault() // evita que o form adicione "?" na URL

        // aqui você faria a validação/autenticação
        navigate("/admin") // redireciona para admin

    }

    return(
        <main className="vw-100 vh-100 d-flex align-items-center">
            <div className="content w-50 p-4">
                <form className='d-flex flex-column gap-4 p-2 mLargura' onSubmit={handleLogin}>
                    <h1 className='text-white fs-4'>Login</h1>   
                    <div className="form-floating w-100">
                        <input type="email" className='form-control' id='floatingInput' placeholder='email@mail.com' />
                        <label for="floatingInput">E-mail</label>                   
                    </div>   
                    <div className="form-floating w-100">
                        <input type="password" className='form-control' id='floatingInput' placeholder='senha...' />
                        <label for="floatingInput">Senha</label>                   
                    </div>   
                    <button
                        className="btn btn-secondary px-3"
                        tipe="submit"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </main>
    )

}
export default Login