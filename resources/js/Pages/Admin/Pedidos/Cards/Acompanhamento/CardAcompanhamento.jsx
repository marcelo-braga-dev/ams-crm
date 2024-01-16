import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";

export default function CardAcompanhamento({dados, cor}) {

    return (
        <CardPedidos
            dados={dados}
            menuMore={<MenuMore id={dados.id}/>}
            border={cor}
            btnAvancaStatus={<BtnAvancaStatus id={dados.id}/>}
            // alerts={<AlertsCard dados={dados}/>}
            // btnAvancaStatus={<BtnAvancaStatus dados={dados}/>}
        />
    )
}
