import Card from './Card'

function btn(id) {

    return (
        <a href={route('admin.leads.cards-pre_atendimento.show', id)}
           className="btn btn-warning btn-sm">
            ABRIR
        </a>
    )
}

export default function PreAtendimentoCard({dados, leadsSelecionados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
            leadsSelecionados={leadsSelecionados}
        />
    )
}
