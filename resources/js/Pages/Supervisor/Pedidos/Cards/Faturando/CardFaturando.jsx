import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";

export default function CardFaturando({dados}) {

    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        btnAvancaStatus={<BtnAvancaStatus dados={dados}/>}
        border="pink"/> )
}
