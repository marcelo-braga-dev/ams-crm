import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import AlertsCard from "./AlertsCard";

export default function CardReprovado({dados}) {

    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        alerts={<AlertsCard dados={dados}/>}
        border="red"/> )
}
