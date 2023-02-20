import CardChamados from "../CardChamados";

export default function FinalizadosCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('consultor.chamados.show', dados.id)}/>
    )
}
