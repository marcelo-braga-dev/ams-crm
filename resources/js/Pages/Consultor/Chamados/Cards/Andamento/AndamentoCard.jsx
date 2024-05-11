import CardChamados from "../CardChamados";

export default function AndamentoCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('consultor.chamados.show', dados.id)}/>
    )
}
