import CardChamados from "../CardChamados";

export default function FinalizadosCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('supervisor.chamado.show', dados.id)}/>
    )
}
