import CardPedidos from "@/Components/Pedidos/CardPedidos";

import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";
import MenuMore from "@/Pages/Consultor/Pedidos/Cards/MenuMore";

export default function CardReprovado({dados, cor}) {
    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            btnAvancaStatus={<BtnAvancaStatus id={dados.id}/>}
            alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}
