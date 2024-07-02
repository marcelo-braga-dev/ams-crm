import Card from './Card'
import {Link} from "@inertiajs/react";
function btn(id) {

    return (
        <Link href={route('consultor.leads.novo.show', id)}
           className="btn btn-primary btn-sm">
            ABRIR
        </Link>
    )
}
export default function NovoCard({dados}) {

    return (
        <Card
            dados={dados}
            btn={btn(dados.id)}
        />
    )
}
