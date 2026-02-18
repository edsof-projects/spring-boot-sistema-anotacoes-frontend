import './Login.css'

const Login = () =>{

    return(
        <main className="vw-100 vh-100 d-flex align-items-center">
            <div className="content w-50 p-4">
                <form className='d-flex flex-column gap-4 p-2 mLargura'>
                    <h1 className='text-white fs-4'>Login</h1>   
                    <div className="form-floating w-100">
                        <input type="email" className='form-control' id='floatingInput' placeholder='email@mail.com' />
                        <label for="floatingInput">E-mail</label>                   
                    </div>   
                    <div className="form-floating w-100">
                        <input type="password" className='form-control' id='floatingInput' placeholder='senha...' />
                        <label for="floatingInput">Senha</label>                   
                    </div>   
                    <div className="btn btn-secondary w-100 py-2 fs-5">Entrar</div>
                </form>
            </div>
        </main>
    )

}
export default Login