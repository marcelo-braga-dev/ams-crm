import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";

export default function CardAcompanhamento({dados, cor}) {

    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            btnAvancaStatus={<BtnAvancaStatus dados={dados}/>}
            alerts={<AlertsCard dados={dados}/>}
            border={cor}
        />
    )
}
