import CardChamados from "../CardChamados";

export default function NovoCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('supervisor.chamado.edit', dados.id)}/>
    )
}
