import Card from './Card'
export default function NovoCard({dados}) {

    return (
        <Card
            dados={dados}
            urlBtn={route('consultor.leads.novo.edit', dados.id)}
        />
    )
}
