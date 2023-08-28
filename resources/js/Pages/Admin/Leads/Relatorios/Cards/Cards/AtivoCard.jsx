import Card from './Card'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function btn(id) {

    return (
        <a href={route('admin.leads.cards-ativo.show', id)}
           className="btn btn-success btn-sm">
            ABRIR
        </a>
    )
}

export default function AtendimentoCard({dados, leadsSelecionados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
            leadsSelecionados={leadsSelecionados}
        />
    )
}
