import Card from './Card'
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function AtendimentoCard({dados}) {
    return (
        <Card
            dados={dados}
            btnUrl={route('consultor.leads.atendimento.edit', dados.id)}
        />
    )
}
