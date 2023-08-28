import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "./BtnAvancaStatus";
import AlertsCard from "./AlertsCard";
import CardModelo2 from "../Modelos/Modelo2/CardModelo2";
import BtnAvancaStatus2 from "../../Modelo2/Lancado/BtnAvancaStatus";

export default function CardLancado({dados, cor}) {

    return (
        <>
            {dados.modelo === 1 ?
                <CardPedidos
                    dados={dados}
                    menuMore={<MenuMore id={dados.id}/>}
                    btnAvancaStatus={<BtnAvancaStatus id={dados.id}/>}
                    alerts={<AlertsCard dados={dados}/>}
                    border={cor}/>
                : <></>}
            {dados.modelo === 2 ?
                <CardModelo2
                    dados={dados}
                    menuMore={<MenuMore id={dados.id}/>}
                    btnAvancaStatus={<BtnAvancaStatus2 id={dados.id}/>}
                    alerts={<AlertsCard dados={dados}/>}
                    border={cor}/>
                : <></>}
        </>)
}
