import Card from './Card'

function btn(id) {

    return (
        <a href={route('admin.leads.cards-aberto.edit', id)}
           className="btn btn-primary btn-sm">
            ABRIR
        </a>
    )
}
export default function AbertoCards({dados, leadsSelecionados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
            leadsSelecionados={leadsSelecionados}
        />
    )
}
