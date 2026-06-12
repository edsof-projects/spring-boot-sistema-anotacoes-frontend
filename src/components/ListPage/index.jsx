import HeaderPage from "../HeaderPage";

export default function ListPage({
  entity,
  search,
  handleChange,
  handleKeyDown,
  goCadastrar,
  isSearching,
  data,
  HeaderComponent,
  TableComponent,
  CardComponent,
  abrirModal,
  goEditar,
  goExcluir,
  modal,
  onMenuClick,
  voltarHomeMobile={voltarHomeMobile}
}) {

  const Header = HeaderComponent ?? HeaderPage;

  return (
    <div className="container-fluid">

     {/* HEADER DINÂMICO */}
      <Header
        entity={entity}
        search={search}
        handleChange={handleChange}
        handleKeyDown={handleKeyDown}
        goCadastrar={goCadastrar}
        isSearching={isSearching}
        onMenuClick={onMenuClick}
        voltarHomeMobile={voltarHomeMobile}
      />

      {/* DESKTOP */}
      <div className="d-none d-md-block">
        <TableComponent
          itens={data}
          abrirModal={abrirModal}
          goEditar={goEditar}
          goExcluir={goExcluir}
          isSearching={isSearching}
        />
      </div>

      {/* MOBILE */}
      <div className="d-md-none lista-mobile">
        <CardComponent
          itens={data}
          abrirModal={abrirModal}
          goEditar={goEditar}
          goExcluir={goExcluir}
          isSearching={isSearching}
          onMenuClick={onMenuClick}
        />
      </div>

      {modal}

    </div>
  );
}