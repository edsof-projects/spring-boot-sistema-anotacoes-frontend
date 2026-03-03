import Title from "../../../components/Title"

const HeaderAnotacoes = ({
    search,
    handleChange,
    handleKeyDown,
    goCadastrar,
    isSearching
}) => {

    return (
        <div className="border px-2 py-2 mb-3">

            {/* Desktop */}
            <div className="d-none d-md-flex justify-content-between align-items-center">

                <div className="col-md-4">
                    <input
                        type="text"
                        className="form-control rounded-5"
                        placeholder="Pesquisar..."
                        value={search}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>

                <div className="col-md-4 text-center">
                    <Title title="Anotacoes" isPrimario={true} />
                </div>

                <div className="col-md-4 d-flex justify-content-end">
                    <button
                        className="btn btn-success px-4"
                        disabled={isSearching}
                        onClick={goCadastrar}
                    >
                        Cadastrar
                    </button>
                </div>
            </div>

            {/* Mobile */}
            <div className="d-md-none">

                <div className="text-center mb-2">
                    <Title title="Anotacoes" isPrimario={true} />
                </div>

                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <button
                    className="btn btn-success w-100"
                    disabled={isSearching}
                    onClick={goCadastrar}
                >
                    Cadastrar
                </button>

            </div>
        </div>
    )
}

export default HeaderAnotacoes