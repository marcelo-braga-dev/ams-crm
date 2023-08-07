import Card from './Card'

function btn(id) {

    return (
        <a href={route('consultor.leads.finalizado.show', id)}
           className="btn btn-dark btn-sm">
            ABRIR
        </a>
    )
}

export default function FinalizadoCard({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
