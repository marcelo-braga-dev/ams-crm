import CardChamados from "../CardChamados";

export default function NovoCard({dados}) {
    return(
        <CardChamados dados={dados} urlAbrir={route('admin.chamado.edit', dados.id)}/>
    )
}
