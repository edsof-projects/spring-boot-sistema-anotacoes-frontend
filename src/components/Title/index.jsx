import "./Title.css"

const Title = ({title,isPrimario}) => {

  // Se isPrimario for true, usa 'btn-primary', senão 'btn-secondary'
  const classeBotao = `${isPrimario ? 'text-danger' : 'text-primary'}`;

  return (
    <div>
       <h2 className={`title  ${classeBotao}`}>{title}</h2>
    </div>
  )
}

export default Title
