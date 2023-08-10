import Card from './Card'

function btn(id) {

    return (
        <a href={route('consultor.leads.novo.show', id)}
           className="btn btn-primary btn-sm">
            ABRIR
        </a>
    )
}
export default function NovoCard({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
