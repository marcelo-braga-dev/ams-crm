import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
// import BtnAvancaStatus from "./BtnAvancaStatus";
// import AlertsCard from "@/Pages/Admin/Pedidos/Cards/Acompanhamento/AlertsCard";


export default function CardEntregue({dados, cor, status}) {
    if (status === 'acompanhamento') {
        return (
            <CardPedidos
                dados={dados}
                menuMore={<MenuMore id={dados.id}/>}
                border={cor}
                // alerts={<AlertsCard dados={dados}/>}
                // btnAvancaStatus={<BtnAvancaStatus dados={dados}/>}
            />
        )
    }

    return (<CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        border={cor}
    />)
}
