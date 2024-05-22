import Card from './Card'

function btn(id, usuarioCard) {

    return (
        <a href={route('admin.leads.cards-novo.show', [id, {usuario_card: usuarioCard}])}
           className="btn btn-primary btn-sm">
            ABRIR
        </a>
    )
}

export default function NovoCard({dados, leadsSelecionados, usuarioCard}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id, usuarioCard)}
            leadsSelecionados={leadsSelecionados}
            usuarioCard={usuarioCard}
        />
    )
}
