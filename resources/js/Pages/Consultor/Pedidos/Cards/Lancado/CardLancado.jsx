import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";

export default function CardLancado({dados}) {
    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        alerts={<AlertsCard dados={dados}/>}
        border="#2dce89"/> )
}
