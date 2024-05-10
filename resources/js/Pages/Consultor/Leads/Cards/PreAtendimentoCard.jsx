import Card from './Card'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function btn(id) {

    return (
        <a href={route('consultor.leads.pre_atendimento.show', id)}
           className="btn btn-warning btn-sm">
            ABRIR
        </a>
    )
}

export default function PreAtendimentoCard({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
