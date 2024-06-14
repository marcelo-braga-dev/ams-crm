import CardPedidos from "@/Components/Pedidos/CardPedidos";
import MenuMore from "@/Pages/Consultor/Pedidos/Cards/MenuMore";
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";

export default function CardFaturando({dados, cor}) {
    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}
