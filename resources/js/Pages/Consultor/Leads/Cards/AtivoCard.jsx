import Card from './Card'
import {Link} from "@inertiajs/react";

function btn(id) {

    return (
        <Link href={route('consultor.leads.ativo.show', id)}
           className="btn btn-success btn-sm">
            ABRIR
        </Link>
    )
}

export default function AtendimentoCard({dados}) {

    return <Card dados={dados} btn={btn(dados.id)} />
}
