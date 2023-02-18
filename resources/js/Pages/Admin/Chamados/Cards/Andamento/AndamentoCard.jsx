import CardChamados from "../CardChamados";

export default function AndamentoCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('admin.chamado.edit', dados.id)}/>
    )
}
