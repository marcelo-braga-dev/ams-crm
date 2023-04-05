import Card from './Card'
export default function FinalizadoCard({dados}) {

    return (
        <Card
            dados={dados}
            // urlBtn={route('consultor.leads.atendimento.edit', dados.id)}
        />
    )
}
