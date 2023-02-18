import CardChamados from "../CardChamados";

export default function AndamentoCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('supervisor.chamado.edit', dados.id)}/>
    )
}
