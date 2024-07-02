import Card from './Card'
import {Link} from "@inertiajs/react";

function btn(id) {

    return (
        <Link href={route('consultor.leads.aberto.show', id)}
           className="btn btn-primary btn-sm">
            ABRIR
        </Link>
    )
}
export default function AbertoCards({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
