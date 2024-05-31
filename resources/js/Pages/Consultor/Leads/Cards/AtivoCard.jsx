import Card from './Card'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function btn(id) {

    return (
        <a href={route('consultor.leads.ativo.show', id)}
           className="btn btn-success btn-sm">
            ABRIR
        </a>
    )
}

export default function AtendimentoCard({dados}) {

    return <Card dados={dados} btn={btn(dados.id)} />
}
