import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";

export default function CardLancado({dados}) {

    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        btnAvancaStatus={<BtnAvancaStatus id={dados.id}/>}
        border="green"/> )
}
