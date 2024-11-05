import Card from './Card'
import Link from "@/Components/Link.jsx";

function btn(id) {
    return <Link label="ABRIR" href={route('admin.leads.cards-pre_atendimento.show', id)}/>
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
