import Card from './Card'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "@/Components/Link.jsx";

function btn(id) {
    return <Link label="ABRIR" href={route('admin.leads.cards-atendimento.show', id)}/>
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
