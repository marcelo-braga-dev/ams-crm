import Card from './Card'
import {Link} from "@inertiajs/react";

function btn(id) {

    return (
        <Link href={route('consultor.leads.atendimento.show', id)}
           className="btn btn-warning btn-sm">
            ABRIR
        </Link>
    )
}

export default function AtendimentoCard({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
