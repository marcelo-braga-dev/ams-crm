import CardDev from "./CardDev";

export default function ConferenciaCard({dados}) {

    return (
        <CardDev dados={dados} btn={route('admin.dev-novo.show', dados.id)}/>
    )
}
