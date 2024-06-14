import CardPedidos from "@/Components/Pedidos/CardPedidos";
import MenuMore from "@/Pages/Consultor/Pedidos/Cards/MenuMore";
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";

export default function CardPagamento({dados, cor}) {
    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            btnAvancaStatus={<BtnAvancaStatus id={dados.id} situacao={dados.infos.situacao}/>}
            alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}
