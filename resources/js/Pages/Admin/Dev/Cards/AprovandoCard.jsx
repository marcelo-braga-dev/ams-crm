import CardDev from "./CardDev";

export default function AprovandoCard({dados}) {

    return (
        <CardDev dados={dados} btn={route('admin.dev-aprovando.show', dados.id)}/>
    )
}
