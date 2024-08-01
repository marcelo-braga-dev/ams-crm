import Card from './Card'
import Link from "@/Components/Link.jsx";

function btn(id) {
    return <Link label="ABRIR" href={route('admin.leads.cards-novo.show', [id])}/>
}

export default function NovoCard({dados, leadsSelecionados}) {
    return <Card dados={dados} btn={btn(dados.id)} leadsSelecionados={leadsSelecionados}/>
}
