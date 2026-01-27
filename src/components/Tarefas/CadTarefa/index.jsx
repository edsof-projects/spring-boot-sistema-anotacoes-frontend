import { useEffect, useState, useRef } from "react"
import {
  createTarefa,
  deleteTarefa,
  editTarefa,
  fecharTarefa,
  getTarefaById
} from "../../../services/ServiceTarefas"

import {
  useNavigate,
  useParams,
} from "react-router-dom"

import { primeiraLetraMaiuscula } from "../../../utils/formatters"
import { useCrudMode } from "../../../hooks/useCrudMode"
import { useModalExclusao } from "../../../hooks/useModalExclusao"
import ModalExclusao from "../../Modals/ModalExclusao"
import Title from "../../Title"
import "./CadTarefa.css"

const CadTarefa = () => {

  const [titulo, setTitulo]               = useState("")
  const [historico, setHistorico]         = useState("")

  const [errors, setErrors]               = useState({})
  const [apiError, setApiError]           = useState("")
  const [successMsg, setSuccessMsg]       = useState("")
  const historicoInicialCriado            = useRef(false)

  const { id }                            = useParams()
  const navigate                          = useNavigate()

  const { mode, isCadastrar, isEditar, isDeletar } = useCrudMode("tarefas")
  
  const {
    isOpen,
    abrirModal,
    fecharModal
  } = useModalExclusao()

  /* ========================
     BUSCAR TAREFA POR ID
  ======================== */
  useEffect(() => {
    if (!id) return

    setApiError("")

    getTarefaById(id)
      .then(res => {
        setTitulo(res.data.titulo)
        setHistorico(res.data.historico)
      })
      .catch(() => {
        setApiError("Erro ao carregar a tarefa.")
      })
  }, [id])

  const inserirData     = () => {
    const data          = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR');
    return dataFormatada;
  }

 function handleCriarHistoricoInicial() {
    if (!isCadastrar) return

    if (!historicoInicialCriado.current) {
      setHistorico(`${inserirData()} : Tarefa inicial.`)
      historicoInicialCriado.current = true
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && isCadastrar) {
      e.preventDefault()
      setHistorico(prev => prev + `\n${inserirData()} : `)
    }
  }

  function ultimaLinhaTemDataAberta(texto) {
    if (!texto) return false
    const linhas = texto.split("\n")
    const ultima = linhas[linhas.length - 1].trim()
    return ultima.endsWith(":")
  }

  function inserirNovaLinhaHistorico() {
    setHistorico(prev => {
      if (!prev.trim()) return `${inserirData()} : `

      if (ultimaLinhaTemDataAberta(prev)) {
        return prev // já pode digitar
      }

      return prev + `\n${inserirData()} : `
    })
  }


  function voltarParaListagem() {
    navigate("/tarefas")
  }

  function validateForm() {
    if (isDeletar) return true

    const newErrors = {}

    if (!titulo.trim())    newErrors.titulo    = "Informe o título"
    if (!historico.trim()) newErrors.historico = "Entre com a informação"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ========================
     SUBMIT PRINCIPAL
  ======================== */
  function handleSubmit(e) {
    e.preventDefault()
    setApiError("")
    setSuccessMsg("")

    if (!validateForm()) return

    // provisório até JWT onde o usuarioId devera ser o que estiver logado
    const payload = {
      titulo,
      historico,
      data_fechamento : dataFechamento || null,
      usuarioId: 14
    }

    if (isCadastrar) {
      createTarefa(payload)
        .then(() => {
          setSuccessMsg("Tarefa cadastrada com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao cadastrar tarefa.")
        })
    }

    if (isEditar && id) {
      editTarefa(payload, id)
        .then(() => {
          setSuccessMsg("Tarefa atualizada com sucesso!")
          setTimeout(voltarParaListagem, 2000)
        })
        .catch(() => {
          setApiError("Erro ao atualizar tarefa.")
        })
    }

    if (isDeletar) {
      abrirModal()
    }
  }

  /* ========================
     CONFIRMAR DELETE
  ======================== */
  function confirmDelete() {
    deleteTarefa(id)
      .then(() => {
        fecharModal()
        setSuccessMsg("Tarefa excluída com sucesso!")
        setTimeout(voltarParaListagem, 2000)
      })
      .catch(() => {
        setApiError("Erro ao excluir a tarefa.")
        fecharModal()
      })
  }

  function handleFecharTarefa() {    
      fecharTarefa(id)
      .then(() => {
        setSuccessMsg("Tarefa fechada com sucesso!")
        setTimeout(voltarParaListagem, 2000)
      })
      .catch(() => {
        setApiError("Erro ao fechar a tarefa")
      })
  }


  /* ============================
     TEXTOS DINÂMICOS DOS TÍTULOS
  =============================== */
  const tituloPagina = {
    CADASTRAR : "Cadastrar Tarefa",
    EDITAR    : `Editar Tarefa - Id: ${id}`,
    DELETAR   : `Excluir Tarefa - Id: ${id}`
  }[mode]

  const textoBotao = {
    CADASTRAR : "Salvar",
    EDITAR    : "Atualizar",
    DELETAR   : "Excluir"
  }[mode]

  const classeBotao = isDeletar ? "btn-danger" : "btn-success"

  /* ========================
     RENDER
  ======================== */
  return (
    <div className="cadTarefa">

      <Title title={tituloPagina} isPrimario />

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className={`form-control mb-2 ${errors.titulo ? "is-invalid" : ""}`}
          type="text"
          value={titulo}
          placeholder="Título"
          disabled={isDeletar}
          onChange={e => setTitulo(e.target.value)}
          onBlur={e => setTitulo(primeiraLetraMaiuscula(e.target.value))}
        />
        {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}

        <textarea
          className   ={`form-control mb-2 ${errors.historico ? "is-invalid" : ""}`}
          rows        ={15}
          value       ={historico}
          placeholder ="Histórico"
          disabled    ={isDeletar}
          onFocus     ={handleCriarHistoricoInicial}
          onChange    ={(e) => setHistorico(e.target.value)}
          onKeyDown   ={handleKeyDown}    
          onClick     ={() => { if (isEditar) {inserirNovaLinhaHistorico()} }}      
        />
        {errors.historico && (
          <div className="invalid-feedback">{errors.historico}</div>
        )}

        <div className="d-flex gap-2 mt-3 ">
          <button type="submit" className={`btn ${classeBotao} botao`}>
            {textoBotao}
          </button>

          <button
            type="button"
            className={`btn btn-secondary botao`}
            onClick={voltarParaListagem}
          >
            Voltar
          </button>

          <button
            type="button"
            className={`btn btn-warning botao`}
            onClick={handleFecharTarefa}    
          >    
            Fechar Tarefa
          </button>

        </div>
      </form>

      {/* MODAL EXCLUSÃO */}
      <ModalExclusao
        isOpen={isOpen}
        mensagem="Deseja realmente excluir a tarefa?"
        id={id}
        nome={titulo}
        onConfirmar={confirmDelete}
        onCancelar={fecharModal}
      />

    </div>
  )
}

export default CadTarefa
