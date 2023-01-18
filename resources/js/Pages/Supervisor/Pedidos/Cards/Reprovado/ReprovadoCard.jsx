import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";

export default function CardReprovado({dados}) {

    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        border="red"/> )
}
