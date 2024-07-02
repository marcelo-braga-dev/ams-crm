import Card from './Card'
import {Link} from "@inertiajs/react";
function btn(id) {

    return (
        <Link href={route('consultor.leads.finalizado.show', id)}
           className="btn btn-dark btn-sm">
            ABRIR
        </Link>
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
