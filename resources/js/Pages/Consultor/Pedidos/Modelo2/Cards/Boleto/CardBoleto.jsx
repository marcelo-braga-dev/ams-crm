import CardPedidos from "../CardPedidos";
import MenuMore from "@/Pages/Consultor/Pedidos/Cards/MenuMore";
import AlertsCard from "./AlertsCard";

export default function CardBoleto({dados, cor}) {

    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}
