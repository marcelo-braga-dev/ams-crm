import CardChamados from "../CardChamados";

export default function FinalizadosCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('admin.chamado.show', dados.id)}/>
    )
}
