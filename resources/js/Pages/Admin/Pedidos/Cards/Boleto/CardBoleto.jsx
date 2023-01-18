
import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";



export default function CardBoleto({dados}) {

    return ( <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        btnAvancaStatus={<BtnAvancaStatus id={dados.id}/>}
        border="#11cdef"/> )
}
