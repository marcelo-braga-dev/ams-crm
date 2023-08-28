import Card from './Card'

function btn(id) {

    return (
        <a href={route('admin.leads.cards-finalizado.show', id)}
           className="btn btn-dark btn-sm">
            ABRIR
        </a>
    )
}
export default function FinalizadoCard({dados, leadsSelecionados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
            leadsSelecionados={leadsSelecionados}
        />
    )
}
