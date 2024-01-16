import CardPedidos from "../CardPedidos";
import MenuMore from './MenuMore';
import BtnAvancaStatus from "../Acompanhamento/BtnAvancaStatus";


export default function CardEntregue({dados, cor, status}) {
    if (status === 'acompanhamento') {
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

    return (<CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id}/>}
        border={cor}
    />)
}
