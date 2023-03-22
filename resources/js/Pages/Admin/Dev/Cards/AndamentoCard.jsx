import CardDev from "./CardDev";

export default function AndamentoCard({dados}) {

    return (
        <CardDev dados={dados} btn={route('admin.dev-andamento.show', dados.id)}/>
    )
}
